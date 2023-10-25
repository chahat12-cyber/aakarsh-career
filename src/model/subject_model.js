const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    subjectName: { type: String, required: true }, // Subject name
    image: {
        data: Buffer,
        contentType: String,  
      },
    stream: {
        type: Schema.Types.ObjectId,
        ref: 'stream',
        required: true
    }
});

const Subject = model('subject', subjectSchema);

module.exports = Subject;
