"use strict";
var express = require('express');
var router = express.Router();
let controller = require('./../app/controllers/routine.controller');


router.get('/', controller.getAll);

router.get('/:id', controller.getOneById);

router.post('/', controller.createObject);

router.delete('/:id', controller.removeObject);

router.put('/:id', controller.updateObject);

module.exports = router;
