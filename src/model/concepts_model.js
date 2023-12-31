const { Schema, model } = require('mongoose');

const conceptsSchema = new Schema({
  conceptName: {
    type: String,
    required: true,
    unique: true, 
  },
  conceptDescription: {
    type: String,
    required: true
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
  stream: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true,
  },
  board: {
    type: String,
    required: true,
  },
  chapter: {
    type: String
  },
  topic: {
    type: String,
    required: true
  },
  study_material: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
 
});

//Added

const Concept = model('Concept', conceptsSchema);
module.exports = Concept;