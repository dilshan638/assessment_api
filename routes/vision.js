var express = require('express');
var router = express.Router();
var userController = require('../controllers/user/user');

router.post('/classify', userController.user);

module.exports = router;
