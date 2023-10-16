const { Schema, model } = require('mongoose');


const boardSchema = new Schema({
   
    name: { type: String, },
});



const BoardSchema = model('Board', boardSchema);

module.exports = BoardSchema;