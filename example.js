/*const api = require('./index.js');

//Set the public WCL api-key that you get from https://www.warcraftlogs.com/accounts/changeuser
api.setApiKey('816ed03da1f3cf30e8c69df8f407deaf');

//Optional parameters.
var params = {};

//Call the function to list guild reports, can be filtered with start and end timestamp with the optional parameters @params.
api.getReportsGuild('carpe cerevisi', 'moonglade', 'eu', params, function(err, data) {

    if (err) {
    //We caught an error, log it to the console and exit.
        console.log(err);
        return;
    }
    //Success, log the whole data object to the console.
    console.log('data:', data);
});*/


const api = require('./index.js');

api.setApiKey('816ed03da1f3cf30e8c69df8f407deaf');

var params = {
    "difficulty": 4,
    "server": "moonglade",
    "region": "eu"
};

api.getRankingsEncounter('1849', params, function(err, data) {

    if (err) {
        console.log(err);
        return;
    }

    console.log('data:', data);
});


