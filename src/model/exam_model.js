const { Schema, model } = require('mongoose');

const examSchema = new Schema({
  examName: {
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
  image: {
    data: Buffer,
    contentType: String,  
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
