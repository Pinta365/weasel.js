Weasel.js
=========
Weasel is a wrapper for the Warcraft Logs API. The name Weasel comes from the sites abbrevation WCL that could be pronounced 'Weasel'... I guess. :)

## Installing with NPM
```
npm install weasel.js
```

## Usage

```javascript
const api = require('weasel.js');

//Set the public WCL api-key that you get from https://www.warcraftlogs.com/accounts/changeuser
api.setApiKey('abcd123abcd123abcd123abcd123abcd123');

//Optional parameters for the api call.
var params = {};

//Call the function to list guild reports, can be filtered on start time and end time as a UNIX timestamp with the optional parameters @params.
api.getReportsGuild('carpe cerevisi', 'moonglade', 'eu', params, function(err, data) {

    if (err) {
    //We caught an error, log the error object to the console and exit.
        console.log(err);
        return;
    }
    //Success, log the whole data object to the console.
    console.log(data);
});

```

## Wrapper functions and details
I will work on a better documentation but this list of functions should get you started atleast.

@params is an optional json-formated object of extra parameters.
@callback is the function to run when the api call is done, takes error and data as parameters.
the rest of the parameters are all strings.
details on optional parameters and other nifty stuff can be viewed at https://www.warcraftlogs.com/v1/docs for now.
```javascript
setApiKey('key')
getZones(params, callback)
getClasses(params, callback)
getRankingsEncounter('encounterID', params, callback)
getRankingsCharacter('characterName', 'serverName', 'serverRegion', params, callback)
getParsesCharacter('characterName', 'serverName', 'serverRegion', params, callback)
getReportsGuild('guildName', 'guildServer', 'guildRegion', params, callback) 
getReportsUser('userName', params, callback)
getReportFights('code', params, callback)
getReportEvents('code', params, callback)
getReportTables('view', 'code', params, callback)
```