const express = require('express');
const UserRoute= express.Router();
const UserController = require('../controller/user_controller');

UserRoute.post("/createAccount", UserController.createAccount);
UserRoute.post("/signIn", UserController.signIn);
UserRoute.get("/fetchAllUsers", UserController.fetchAllUsers);
UserRoute.get("/fetchUserById/:id", UserController.fetchUserById);
UserRoute.put("/updateUser/:id", UserController.updateUser);

module.exports = UserRoute;