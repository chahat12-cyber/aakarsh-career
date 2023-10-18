const express = require('express');
const examTypeRoute= express.Router();
const ExamTypeController = require('../controller/exam_type_controller');

examTypeRoute.post("/createExamType", ExamTypeController.createExamType);
examTypeRoute.get("/fetchExamType", ExamTypeController.fetchAllExamType);
examTypeRoute.get("/fetchExamTypebyId/:id", ExamTypeController.fetchExamTypeById);
examTypeRoute.put("/updateExamTypeData/:id", ExamTypeController.updateExamTypeById);
examTypeRoute.delete("/deleteExamsData/:id", ExamTypeController.deleteExamTypeById);
module.exports = examTypeRoute;