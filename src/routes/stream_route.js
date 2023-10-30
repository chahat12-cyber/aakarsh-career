const express = require('express');
const streamRoute= express.Router();
const StreamController = require('../controller/stream_controller');

streamRoute.post("/createStream", StreamController.createStream);
streamRoute.get("/fetchStream", StreamController.fetchAllStream);
streamRoute.get("/fetchStreamByid/:Id", StreamController.fetchStreamById);
streamRoute.put("/updateStreamData/:id", StreamController.updateStreamData);
streamRoute.delete("/deleteStreamData/:id", StreamController.deleteStreamData);


module.exports = streamRoute;