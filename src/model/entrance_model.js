const { Schema, model } = require('mongoose');


const entranceExamSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      class: {
        type: String,
        required: true,
      },
      stream: {
        type: String,
        required: true,
      },
       boards: {
              type: String,
              required: true,
            },
  });

const EntranceModel = model('Entrance', entranceExamSchema);

module.exports = EntranceModel;

