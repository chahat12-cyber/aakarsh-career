const {model, Schema} = require('mongoose');

const questionSchema = new Schema({
  board: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        // Ensure there are exactly 4 choices
        return value.length === 4;
      },
      message: props => `${props.value} must have exactly 4 choices`,
    },
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = model('Question', questionSchema);

module.exports = Question;
