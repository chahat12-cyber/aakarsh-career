const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    subjectName: { type: String, required: true }, // Subject name
    class: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,  
      },
    stream: {
        type: String,
        required: true
    }
});

const Subject = model('subject', subjectSchema);

module.exports = Subject;
