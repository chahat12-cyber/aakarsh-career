const express = require('express');
const chapterRoute= express.Router();
const ChapterController = require('../controller/chapter_controller');

chapterRoute.post("/createChapter", ChapterController.createChapter);
chapterRoute.get("/fetchChapterBySubjectId/:subjectId", ChapterController.fetchChapterBySubjectId);
chapterRoute.get("/fetchAllChapters", ChapterController.fetchAllChapters);
chapterRoute.get("/fetchChaptersByFilter", ChapterController.fetchChapterByFilter);
chapterRoute.get("/fetchChapterByid/:Id", ChapterController.fetchChapterById);
chapterRoute.put("/updateChapter/:Id", ChapterController.updateChapter);
chapterRoute.delete("/deleteChapter/:Id", ChapterController.deleteChapter);

module.exports= chapterRoute;