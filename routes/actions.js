var express = require('express');
var router = express.Router();
var actionsController = require("./../controllers/actions");



router.route('/:action_Id')
    .put(actionsController.executeAction);


router.use('/', function (req, res, next) {
    if (req.method != 'PUT')
        return res.sendMethodNotAllowedError('PUT');
});


module.exports = router;