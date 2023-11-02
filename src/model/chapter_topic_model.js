const { Schema, model } = require('mongoose');

const chapterTopicSchema = new Schema({
  topicName: {
    type: String,
    required: true,
    unique: true, 
  },
  topicDecription: {
    type: String
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true
  }
});


const ChapterTopic = model('ChapterTopic', chapterTopicSchema);
module.exports = ChapterTopic;