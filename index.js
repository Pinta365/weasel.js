const https = require("https");
var apiKey = '';

function serializeQuerystring(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function getData(path, query, callback) {
    var qs = !query ? {} : query;
    qs.api_key = apiKey;
    qs = serializeQuerystring(qs);

    var options = {
        "method": "GET",
        "hostname": "www.warcraftlogs.com",
        "port": null,
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

    setApiKey: function(key) {
        apiKey = key;
    },
    
    getZones: function(query, callback){
        getData('/zones', query, callback);
    },
    
    getClasses: function(query, callback){
        getData('/classes', query, callback);
    },
    
    getRankingsEncounter: function(encounterID, query, callback){
        getData('/rankings/encounter/' + encounterID, query, callback);
    },
    
    getRankingsCharacter: function(characterName, serverName, serverRegion, query, callback){
        getData('/rankings/character/' + characterName + '/' + serverName + '/' + serverRegion, query, callback);
    },
    
    getParsesCharacter: function(characterName, serverName, serverRegion, query, callback){
        getData('/parses/character/'+ characterName + '/' + serverName + '/' + serverRegion, query, callback);
    },
     
    getReportsGuild: function(guildName, guildServer, guildRegion, query, callback) {
        getData('/reports/guild/' + guildName + '/' + guildServer + '/' + guildRegion, query, callback);
    },
    
    getReportsUser: function(userName, query, callback){
        getData('/reports/user'+ userName, query, callback);
    },
    
    getReportFights: function(code, query, callback){
        getData('/report/fights/'+ code, query, callback);
    },
    
    getReportEvents: function(code, query, callback){
        getData('/report/events/'+ code, query, callback);
    },
    
    getReportTables: function(view, code, query, callback){
        getData('/report/tables/'+ view + '/' + code, query, callback);
    },

};