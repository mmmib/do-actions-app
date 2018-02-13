
var uuid = require('node-uuid');
var moment = require("moment");

module.exports = function (req, res, next) {

	req.requestId = uuid.v1();
	req.requestTime = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS');
	console.log(`[${req.requestId} ] New request on ` + req.requestTime);
	console.log(`[${req.requestId} ] Details: ${req.method.toString()} ${req.originalUrl.toString()} 
	Authorization: ${req.headers.authorization}  Query params: ${JSON.stringify(req.query)} Body: ${JSON.stringify(req.body)}`);
	next();
}