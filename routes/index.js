var express = require('express');
var router = express.Router();
var ApplicationController = require('../controllers/application_controller')
/* GET home page. */
router.get('/', ApplicationController.index);
router.get('/removeTask/:id', ApplicationController.removeTask);
router.get('/open/app/:appName', ApplicationController.openApp);

module.exports = router;
