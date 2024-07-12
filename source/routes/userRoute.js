const express = require('express')
const { createUser } = require('../controllers/userController');

const userRouter = express.Router();
userRouter.post('/' , createUser); //this is a route registration
module.exports = userRouter ;//exporting the route