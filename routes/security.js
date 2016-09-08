"use strict";
var express = require('express');
var router = express.Router();
let controller = require('./../app/controllers/security.controller');

router.post('/loginFb', controller.loginFbProcess);
router.post('/login', controller.loginProcess);
router.put('/updatepwd/:id', controller.updatePassword);
router.put('/resetpwd/:id', controller.resetPassword);

module.exports = router;
