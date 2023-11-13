const express = require('express');
const questionRoute= express.Router();
const QuestionController = require('../controller/question_controller');

questionRoute.post("/createQuestion", QuestionController.createQuestion);
questionRoute.get("/getAllQuestions", QuestionController.fetchAllQuestions);
questionRoute.get("/getQuestionById/:id", QuestionController.fetchQuestionById);
questionRoute.get("/getQuestionByCriteria", QuestionController.fetchQuestionsByFilters);
questionRoute.put("/updateQuestion/:id", QuestionController.updateQuestionById);
questionRoute.delete("/deleteQuestion/:id", QuestionController.deleteQuestion);

module.exports = questionRoute;