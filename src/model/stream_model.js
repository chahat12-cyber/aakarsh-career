const { Schema, model } = require('mongoose');


const streamSchema = new Schema({
   
    stream: { type: String, },
});



const StreamSchema = model('stream', streamSchema);

module.exports = StreamSchema;