const express = require('express');
const videoRoute= express.Router();
const VideoController = require('../controller/video_controller');

videoRoute.post("/createVideo", VideoController.createVideo);
videoRoute.get("/getAllVideos", VideoController.fetchAllVideos);
videoRoute.get("/getVideosById/:id", VideoController.fetchVideoById);
videoRoute.get("/getVideosByCriteria", VideoController.fetchVideosByFilters);
videoRoute.put("/updateVideo/:id", VideoController.updateVideoById);
videoRoute.delete("/deleteVideo/:id", VideoController.deleteVideo);

module.exports = videoRoute;