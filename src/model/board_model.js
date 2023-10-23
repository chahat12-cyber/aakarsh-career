const { Schema, model } = require('mongoose');


const boardSchema = new Schema({
   
    name: { type: String, },
    boardimage: {
        data: Buffer,
        contentType: String,  
      },
});



const BoardSchema = model('Board', boardSchema);

module.exports = BoardSchema;