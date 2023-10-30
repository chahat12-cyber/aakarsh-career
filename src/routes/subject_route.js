const express = require('express');
const subjectRoute= express.Router();
const SubjectController = require('../controller/subject_controller');

subjectRoute.post("/createSubject", SubjectController.createSubject);
subjectRoute.get("/fetchSubjects", SubjectController.fetchAllSubject);
subjectRoute.get("/fetchSubjectByStream", SubjectController.fetchSubjectsByStream);
subjectRoute.get("/fetchSubjectByid/:Id", SubjectController.fetchSubjectById);
subjectRoute.put("/updateSubject/:id", SubjectController.updateSubjectById);
subjectRoute.delete("/deleteSubject/:id", SubjectController.deleteSubjectById);

module.exports = subjectRoute;