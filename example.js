var api = require('./index.js');
api.setApiKey('816ed03da1f3cf30e8c69df8f407deaf');

var query = {
    "difficulty": 4,
    "server": "moonglade",
    "region": "eu"
};

api.getRankingsEncounter('1849', query, function(err, data) {

    if (err) {
        console.log(err);
        return;
    }

    console.log('data:', data);
});
