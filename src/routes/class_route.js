const express = require('express');
const classRoute= express.Router();
const ClassController = require('../controller/class_controller');

classRoute.post("/createClass", ClassController.createClass);
classRoute.get("/fetchClass", ClassController.fetchAllClass);
classRoute.put("/updateClassData/:id", ClassController.updateClassData);
classRoute.delete("/deleteClassData/:id", ClassController.deleteClassData);


module.exports = classRoute;