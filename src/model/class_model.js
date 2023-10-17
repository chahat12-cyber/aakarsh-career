const { Schema, model } = require('mongoose');


const classSchema = new Schema({
   
    class: { type: Number, },
});



const ClassSchema = model('class', classSchema);

module.exports = ClassSchema;