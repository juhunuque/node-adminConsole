"use strict";
var express = require('express');
var router = express.Router();
let controller = require('./../app/controllers/security.controller');

router.post('/login', controller.loginProcess);

module.exports = router;
