"use strict";
var express = require('express');
var router = express.Router();
let userController = require('./../app/controllers/user.controller');

/**
 *  @swagger
 *  /v1/users:
 *    get:
 *      tags:
 *        - user
 *      summary: Get all Users
 *      operationId: /v1/users
 *      description: Returns all User objects
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        500:
 *          description: Server error
 */
router.get('/', userController.getAllUsers);

/**
 *  @swagger
 *  /v1/users/{id}:
 *    get:
 *      tags:
 *        - user
 *      summary: Get single user by id
 *      operationId: /v1/users/{id}
 *      description: Returns a single user
 *      produces:
 *      - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of user to return
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        500:
 *          description: Server Error
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 */
router.get('/:id', userController.getUser);

/**
 *  @swagger
 *  /v1/users/:
 *    post:
 *      tags:
 *        - user
 *      summary: Create a new User
 *      operationId: /v1/users
 *      description: Create a new User
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          description: User object
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              nameUser:
 *                type: String
 *                required: true
 *                example: string
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              nameUser:
 *                type: String
 *                example: string
 *        500:
 *          description: Server Error
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 *        400:
 *          description: Bad Request
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 */
router.post('/', userController.createUser);

/**
 *  @swagger
 *  /v1/users/{id}:
 *    delete:
 *      tags:
 *        - user
 *      summary: Remove a user object
 *      operationId: /v1/users/{id}
 *      description: Remove a user
 *      produces:
 *      - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of user to remove
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        500:
 *          description: Server Error
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 */
router.delete('/:id', userController.removeObject);

/**
 *  @swagger
 *  /v1/users/{id}:
 *    put:
 *      tags:
 *        - user
 *      summary: Update a single user
 *      operationId: /v1/users/{id}
 *      description: Update a user
 *      produces:
 *      - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of user to update
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        500:
 *          description: Server Error
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: String
 *                example: Error
 */
router.put('/:id', userController.updateObject);

module.exports = router;
