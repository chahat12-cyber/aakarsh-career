const express = require('express');
const TestRoute= express.Router();
const TestController = require('../controller/test_controller');

TestRoute.post("/createTest", TestController.createTest);

TestRoute.get("/allTest", TestController.fetchAllTest);
TestRoute.get("/fetchTestById/:id", TestController.fetchTestById);
TestRoute.get("/fetchTestByExamType", TestController.fetchTestByExamType);
TestRoute.put("/updateTest/:id", TestController.updateTest);
TestRoute.delete("/deleteTest/:id", TestController.deleteTest);

module.exports= TestRoute;
