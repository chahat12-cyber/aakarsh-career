const express = require('express');
const entranceRoute= express.Router();
const EntranceController = require('../controller/entrance_controller');

entranceRoute.post("/createEntrance", EntranceController.createEntrance);
entranceRoute.get("/fetchEntrance", EntranceController.fetchAllEntrance);
entranceRoute.get("/fetchEntranceData", EntranceController.fetchEntranceById);
entranceRoute.get("/fetchEntranceByClass/:class", EntranceController.fetchEntranceByClass);
entranceRoute.put("/updateEntranceData/:id", EntranceController.updateEntranceData);
entranceRoute.delete("/deleteEntranceData/:id", EntranceController.deleteEntranceData);

module.exports = entranceRoute;
