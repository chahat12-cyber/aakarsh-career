const { Schema, model } = require('mongoose');

const examSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  entrance: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const exam = model('Exam', examSchema);

module.exports = exam;
