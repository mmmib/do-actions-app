const moment = require('moment');
const restAdapter = require('./../connectors/rest');
const actionType = {
    TADO_MODE: 'TADO_MODE',
    TIMER: 'TIMER',
    MANUAL: 'MANUAL'
};
const settingsType = {
    HEATING: 'HEATING',
    AIR_CONDITIONING: 'AIR_CONDITIONING',
    HOT_WATER: 'HOT_WATER'
};

const power = {
    ON: 'ON',
    OFF: 'OFF'
};


var actionsController = {

    executeAction: function (req, res) {

        console.log(`[${req.requestId} ] START executeAction ...`);

        let requestBody = {};
        let actionId = req.params.action_Id !== undefined ? req.params.action_Id : 2;
        let degreeInCelsius = req.body.celsius !== undefined ? req.body.celsius : 25;

        //Overlay expiry in Minutes
        let overlayExpiry = req.body.expiray !== undefined ? req.body.expiray : 5;

        //BOOST case
        if (actionId == 1) {
            requestBody = {
                type: actionType.TADO_MODE,
                setting: {
                    type: settingsType.HEATING,
                    power: power.ON,
                    temperature: {
                        celsius: degreeInCelsius
                    }
                },
                termination: { type: actionType.TADO_MODE }
            };
        }
        //COOLDOWN case
        else if (actionId == 2) {
            requestBody = {
                type: actionType.TIMER,
                setting: {
                    type: settingsType.HEATING,
                    power: power.OFF
                },
                termination: { type: actionType.TIMER, projectedExpiry: moment(new Date(), moment.ISO_8601).add(overlayExpiry, 'minutes').format() }
            };
        }
        const params = { homeId: req.body.homeId, zoneId: req.body.zoneId }
        restAdapter.put(requestBody, params)
            .then(data => {
                console.log(`[${req.requestId} ] PUT Response data ${data}`);

                /*let mocheData = {
                    "type": "MANUAL",
                    "setting": {
                        "type": "HEATING",
                        "power": "ON",
                        "temperature": {
                            "celsius": 22,
                            "fahrenheit": 71.6
                        }
                    },
                    "termination": {
                        "type": "MANUAL",
                        "projectedExpiry": null
                    }
                };*/

                res.json(data);
            })
            .catch(error => {
                console.log(`[${req.requestId} ] PUT ERROR message ${error.message}....`);
                res.json({});
            });
    }
};

module.exports = actionsController;