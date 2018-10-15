var express = require('express');
var router = express.Router();

var PowerController = require('../controllers/power_controller')
console.log(PowerController)
/* GET users listing. */
router.post('/sleep', PowerController.sleep);
router.post('/shutdown', PowerController.sleep);

module.exports = router;
