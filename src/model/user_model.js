const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    id: { type: String, unique: true },
    fullName: { type: String, },
    email: { type: String,  },
    phoneNumber: { type: String, required: true, immutable: true, index: {unique: true}},
    profileProgress: { type: Number, default: 0 },
    selectedClass: {
        type: String,
        required: true,
      },
      selectedBoard: {
              type: String,
              required: true,
            },
      selectedStream: {
        type: String,
        required: true,
      },
      exams: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Exam', 
        },
      ],
});



const UserModel = model('User', userSchema);

module.exports = UserModel;