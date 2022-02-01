import express from 'express';
import userController from '../controller/user.controller';
import fileController from '../controller/file.controller';

const router = express.Router();
const prefixRoute = '/api/v1';

/** User Routes */

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the auto generated id of the user
 *              name: 
 *                  type: string
 *                  description: name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              surName:
 *                  type: string
 *                  description: sur name of the user
 *              rfc:
 *                  type: string
 *                  description: rfc of the user
 *              birthday:
 *                  formate: date-time
 *                  type: string
 *                  description: birthday of the user
 *              createdAt:
 *                  formate: date-time
 *                  type: string
 *                  description: date user was created
 *              updatedAt:
 *                  formate: date-time
 *                  type: string
 *                  description: date user was updated
 *              profilePicture:
 *                  type: string
 *                  description: updated profile picture
 *              files:
 *                  type: array
 *                  description: uploaded files
 *          required:
 *              - name
 *              - lastName
 *              - surName
 *              - rfc
 *              - birthday
 *      FileRequest:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto generated id of the user
 *              data:
 *                  type: string
 *                  format: binary
 *                  description: uploaded file
 *          required:
 *              - id
 *              - data
 *  parameters:
 *      userId:
 *          in: path
 *          required: true
 *          name: id
 *          schema:
 *              type: string
 *          description: user identifier        
 */

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *      summary: Gets a user list
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Users list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get(prefixRoute + '/user', userController.getUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  get:
 *      summary: Gets a specific user
 *      tags: [Users]
 *      parameters:
 *          -   $ref: '#/components/parameters/userId'
 *      responses:
 *          200:
 *              description: Found user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
router.get(prefixRoute + '/user/:id', userController.getUserById);

/**
 * @swagger
 * /api/v1/user:
 *  post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created
 *          500:
 *              description: User can't be created
 */
router.post(prefixRoute + '/user', userController.saveUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  put:
 *      summary: Updates a user
 *      tags: [Users]
 *      parameters:
 *          -   $ref: '#/components/parameters/userId'
 *      responses:
 *          200:
 *              description: updated user
 *          304:
 *              description: user not modified
 */
router.put(prefixRoute + '/user/:id', userController.updateUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *  delete:
 *      summary: Deletes a user
 *      tags: [Users]
 *      parameters:
 *          -   $ref: '#/components/parameters/userId'
 *      responses:
 *          202:
 *              description: user successfully deleted
 *          400:
 *              description: failed to delete user
 *          404:
 *              description: user not found
 */
router.delete(prefixRoute + '/user/:id', userController.deleteUser);

/** Files Routes */
/**
 * @swagger
 * /api/v1/files:
 *  post:
 *      summary: Upload a file
 *      tags: [Files]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/FileRequest'
 *      responses:
 *          200:
 *              description: File uploaded successfully
 *          304:
 *              description: User can't be updated
 *          415:
 *              description: Format file not allowed
 *          400:
 *              description: Error on uploading file
 */
router.post(prefixRoute + '/files', fileController.saveFile);

/**
 * @swagger
 * /api/v1/photo:
 *  post:
 *      summary: Uploads a profile picture
 *      tags: [Files]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/FileRequest'
 *      responses:
 *          200:
 *              description: File uploaded successfully
 *          304:
 *              description: User can't be updated
 *          415:
 *              description: Format file not allowed
 *          400:
 *              description: Error on uploading file
 */
router.post(prefixRoute + '/photo', fileController.saveProfilePicture);

export = router;