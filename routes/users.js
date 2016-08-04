"use strict";
var express = require('express');
var router = express.Router();
let controller = require('./../app/controllers/user.controller');
let security = require('./../app/controllers/security.controller');


router.get('/', security.isAuthenticated, controller.getAll);

router.get('/:id', security.isAuthenticated, controller.getOneById);

router.get('/byEmail/:email', security.isAuthenticated, controller.getOneByEmail);

router.post('/', security.isAuthenticated, controller.createObject);

router.delete('/:id', security.isAuthenticated, controller.removeObject);

router.put('/:id', security.isAuthenticated, controller.updateObject);

module.exports = router;
