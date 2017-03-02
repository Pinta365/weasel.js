const https = require("https");
var apiKey = '';

function serializeParamString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function getData(path, params, callback) {
    var qs = !params ? {} : params;
    qs.api_key = apiKey;
    qs = serializeParamString(qs);

    var options = {
        "method": "GET",
        "hostname": "www.warcraftlogs.com",
        "port": 443,
        "path": "/v1" + encodeURI(path) + "?" + qs,
        "headers": {
            "cache-control": "no-cache"
        }
    };

    var req = https.request(options, function(res) {
        var parts = [];

        req.on('error', (err) => {
            callback(err);
        });

        res.on("data", function(part) {
            parts.push(part);
        });

        res.on("end", function() {
            var data = Buffer.concat(parts);
            data = JSON.parse(data);

            if (res.statusCode < 200 || res.statusCode >= 300) {
                callback(new Error(res.statusCode + ' - ' + data.error));
            }
            else {
                callback(null, data);
            }

        });
    });

    req.end();
}


module.exports = {

    /**
     * Sets your Warcraft Logs API-key which is needed to use the WCL API calls.
     * @param {string} key - your api-key from https://www.warcraftlogs.com/accounts/changeuser
     */
    setApiKey: function(key) {
        if(key && key.trim() != "") {
            apiKey = key;    
        }
    },

    getZones: function(params, callback) {
        getData('/zones', params, callback);
    },

    getClasses: function(params, callback) {
        getData('/classes', params, callback);
    },

    getRankingsEncounter: function(encounterID, params, callback) {
        getData('/rankings/encounter/' + encounterID, params, callback);
    },

    getRankingsCharacter: function(characterName, serverName, serverRegion, params, callback) {
        getData('/rankings/character/' + characterName + '/' + serverName + '/' + serverRegion, params, callback);
    },

    getParsesCharacter: function(characterName, serverName, serverRegion, params, callback) {
        getData('/parses/character/' + characterName + '/' + serverName + '/' + serverRegion, params, callback);
    },

    getReportsGuild: function(guildName, guildServer, guildRegion, params, callback) {
        getData('/reports/guild/' + guildName + '/' + guildServer + '/' + guildRegion, params, callback);
    },

    getReportsUser: function(userName, params, callback) {
        getData('/reports/user' + userName, params, callback);
    },

    getReportFights: function(code, params, callback) {
        getData('/report/fights/' + code, params, callback);
    },

    getReportEvents: function(code, params, callback) {
        getData('/report/events/' + code, params, callback);
    },

    getReportTables: function(view, code, params, callback) {
        getData('/report/tables/' + view + '/' + code, params, callback);
    }
};