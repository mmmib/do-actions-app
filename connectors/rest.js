const axios = require('axios');
const tadoConfig = require('./../config').rest;

function invoke(URI, verb, body = {}, params = {}) {

    var options = {
        method: verb,
        url: `${tadoConfig.BaseURL}${URI}`,
        headers: { 'Content-Type': tadoConfig.Content_Type, 'Authorization': tadoConfig.AccessToken },
        data: body
    }
    console.log('tado API request config : ' + JSON.stringify(options));
    return axios(options)
        .then(response => {
            console.log(`tado Response  ${response.data}`);
            return response.data;
        })
        .catch(error => {
            console.log(`tado ERROR ${error}`);
            throw error;
        });
}


module.exports = {
    get: function (params) {
        const uri = `/homes/${params.homeId}`;
        return invoke(uri, 'GET');
    },
    put: function (body, params) {
        const uri = `/homes/${params.homeId}/zones/${params.zoneId}/overlay`;
        return invoke(uri, 'PUT', body);
    }
};

