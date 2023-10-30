const { Schema, model } = require('mongoose');

const chapterSchema = new Schema({
  chapterName: {
    type: String,
    required: true,
    unique: true, 
  },
  chapterDecription: {
    type: String
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
 
});


const Chapter = model('Chapter', chapterSchema);
module.exports = Chapter;