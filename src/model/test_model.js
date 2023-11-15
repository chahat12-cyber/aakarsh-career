const {Schema, model} = require('mongoose');

const testSchema = new Schema({
  examType: {
    type: String,
    required: true
  },
  exam: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    required: true
  },
  passingMarks: {
    type: Number,
    required: true
  },
  testName: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  defaultMarksPerQuestion: {
    type: Number,
    required: true
  },
  negativeMarks: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  qualifyingMarks: {
    type: Number,
    required: true
  },
  startingDate: {
    type: Date,
    required: true
  },
  endingDate: {
    type: Date,
    required: true
  },
  totalTimeInMin: {
    type: Number,
    required: true
  }
});

const Test = model('Test', testSchema);

module.exports = Test;
