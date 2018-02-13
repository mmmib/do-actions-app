
function formatRequestResponse(res, replymessage, requestid, requestTime, err, respdata, isErrorResp) {
    var jsonResponse = '';
    if (isErrorResp)
        jsonResponse = {
            replyCode: -1,
            replyMessage: "[Request failed] " + err.message,

            requestId: requestid || "",
            requestTime: requestTime || new Date().toUTCString(),
            error: err
        };
    else
        jsonResponse = {
            replyCode: 0,
            replyMessage: "[Request handled] " + replymessage,
            requestId: requestid || "",
            requestTime: requestTime || new Date().toUTCString(),
            data: respdata || {}
        };
    return jsonResponse;
}


module.exports = function (req, res, next) {

    res.sendServerError = function (sqlerrObj) {

        res.status(500);
        var err = new Error('Oops something went wrong');
        err.status = 500;
        err.description = 'The server encountered an unexpected condition which prevented it from fulfilling the request.';

        console.log('[' + req.requestId + '] ServerError  ' + sqlerrObj);
        res.data = formatRequestResponse(res, '', req.requestId, req.requestTime, err, null, true);
        res.json(res.data);
    },
        res.sendOK = function (replymessage, jsondata) {
            res.status(200);
            res.data = formatRequestResponse(res, replymessage, req.requestId, req.requestTime, null, jsondata, false);
            res.json(res.data);
            res.logAPIRequestResponse();
        },
        res.sendMethodNotAllowedError = function (headers) //headers string seperated by comma
        {
            res.status(405);
            var err = new Error('Method Not Allowed');
            err.status = 405;
            err.description = 'HTTP request is not allowed , check header[allow] parameter';
            res.header('Allow', headers);
            res.data = formatRequestResponse(res, '', req.requestId, req.requestTime, err, null, true);
            res.json(res.data);
        }
    next();
}