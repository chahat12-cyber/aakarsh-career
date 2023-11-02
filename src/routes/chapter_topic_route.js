const express = require('express');
const chapterTopicRoute= express.Router();
const ChapterTopicController = require('../controller/chapter_topic_controller');

chapterTopicRoute.post("/createTopic", ChapterTopicController.createTopic);
chapterTopicRoute.get("/fetchTopicByChapter", ChapterTopicController.fetchTopicByChapter);
chapterTopicRoute.get("/fetchAllTopics", ChapterTopicController.fetchAllTopics);
chapterTopicRoute.get("/fetchTopicByFilters", ChapterTopicController.fetchTopicByFilter);
chapterTopicRoute.get("/fetchTopicById/:Id", ChapterTopicController.fetchTopicById);
chapterTopicRoute.put("/updateTopic/:Id", ChapterTopicController.updateTopic);
chapterTopicRoute.delete("/deleteTopic/:Id", ChapterTopicController.deleteTopic);
module.exports = chapterTopicRoute;