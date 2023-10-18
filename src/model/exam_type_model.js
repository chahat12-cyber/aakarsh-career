const { Schema, model } = require('mongoose');

const examType = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,  
  },
});

const ExamType = model('ExamType', examType);

module.exports = ExamType;
