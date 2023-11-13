const QuestionModel = require('../model/questions_model');

const QuestionController = {
  createQuestion: async function (req, res) {
    console.log('calling here')
    try {
      const questionData = req.body;
      const newQuestion = new QuestionModel(questionData);
      const savedQuestion = await newQuestion.save();

      const responseObject = {
        _id: savedQuestion._id,
        board: savedQuestion.board,
        class: savedQuestion.class,
        chapter: savedQuestion.chapter,
        subject: savedQuestion.subject,
        topic: savedQuestion.topic,
        difficultyLevel: savedQuestion.difficultyLevel,
        type: savedQuestion.type,
        question: savedQuestion.question,
        choices: savedQuestion.choices,
        correctAnswer: savedQuestion.correctAnswer,
      };

      return res.json({ success: true, data: responseObject });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  },

  fetchAllQuestions: async function (req, res) {
    try {
      const allQuestions = await QuestionModel.find().lean();

      const formattedQuestions = allQuestions.map((question) => ({
        _id: question._id,
        board: question.board,
        class: question.class,
        chapter: question.chapter,
        subject: question.subject,
        topic: question.topic,
        difficultyLevel: question.difficultyLevel,
        type: question.type,
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }));

      return res.json({ success: true, data: formattedQuestions });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  },

  fetchQuestionById: async function (req, res) {
    const questionId = req.params.id;

    try {
      const question = await QuestionModel.findById(questionId).lean();

      if (!question) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }

      const responseObject = {
        _id: question._id,
        board: question.board,
        class: question.class,
        chapter: question.chapter,
        subject: question.subject,
        topic: question.topic,
        difficultyLevel: question.difficultyLevel,
        type: question.type,
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      };

      return res.json({ success: true, data: responseObject });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  fetchQuestionsByFilters: async function (req, res) {
    const { questionClass, questionChapter, questionBoard, questionSubject, questionTopic } = req.query;

    const filters = {};

    if (questionClass) filters.class = questionClass;
    if (questionChapter) filters.chapter = questionChapter;
    if (questionBoard) filters.board = questionBoard;
    if (questionSubject) filters.subject = questionSubject;
    if (questionTopic) filters.topic = questionTopic;

    try {
      const questions = await QuestionModel.find(filters).lean();

      const formattedQuestions = questions.map((question) => ({
        _id: question._id,
        board: question.board,
        class: question.class,
        chapter: question.chapter,
        subject: question.subject,
        topic: question.topic,
        difficultyLevel: question.difficultyLevel,
        type: question.type,
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
      }));

      return res.json({ success: true, data: formattedQuestions });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  updateQuestionById: async function (req, res) {
    const questionId = req.params.id;
    const updatedQuestionData = req.body;

    try {
      const updatedQuestion = await QuestionModel.findByIdAndUpdate(
        questionId,
        updatedQuestionData,
        { new: true, runValidators: true }
      );

      if (!updatedQuestion) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }

      const responseObject = {
        _id: updatedQuestion._id,
        board: updatedQuestion.board,
        class: updatedQuestion.class,
        chapter: updatedQuestion.chapter,
        subject: updatedQuestion.subject,
        topic: updatedQuestion.topic,
        difficultyLevel: updatedQuestion.difficultyLevel,
        type: updatedQuestion.type,
        question: updatedQuestion.question,
        choices: updatedQuestion.choices,
        correctAnswer: updatedQuestion.correctAnswer,
      };

      return res.json({ success: true, data: responseObject, message: 'Question updated successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteQuestion: async function (req, res) {
    const questionId = req.params.id;

    try {
      const deletedQuestion = await QuestionModel.findByIdAndRemove(questionId);

      if (!deletedQuestion) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }

      return res.json({ success: true, data: deletedQuestion, message: 'Question deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = QuestionController;
