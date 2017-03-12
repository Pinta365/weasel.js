Weasel.js
=========
Weasel is a wrapper for the [Warcraft Logs API](https://www.warcraftlogs.com/v1/docs). The name Weasel comes from the sites abbreviation WCL that could be pronounced 'Weasel'... I guess. :)

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
Check out the documentation found in the /docs/index.html