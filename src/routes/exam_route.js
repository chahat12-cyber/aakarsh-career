const express = require('express');
const examRoute= express.Router();
const ExamController = require('../controller/exam_controller');

examRoute.post("/createExam", ExamController.createExam);
examRoute.get("/fetchExams", ExamController.fetchAllExams);
examRoute.get("/fetchExamByFilter", ExamController.getExamByFilter);
examRoute.get("/fetchExamByUserId/:userId", ExamController.getExamByUserId);
examRoute.get("/fetchExamByExamId/:examId", ExamController.getExamByExamId);
examRoute.put("/updateExamData/:id", ExamController.updateExamData);
examRoute.delete("/deleteExamsData/:id", ExamController.deleteExamData);


module.exports = examRoute;