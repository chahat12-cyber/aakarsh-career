const { Schema, model } = require('mongoose');

const conceptsSchema = new Schema({
  conceptName: {
    type: String,
    required: true,
    unique: true, 
  },
  conceptDecription: {
    type: String
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
 
});


const Chapter = model('Chapter', chapterSchema);
module.exports = Chapter;