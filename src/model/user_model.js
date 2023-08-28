const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    fullName: { type: String, default: "" },
    email: { type: String, unique: true,},
    phoneNumber: { type: String, required: true, immutable: true},
    profileProgress: { type: Number, default: 0 },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

userSchema.pre('save', function(next) {
    
    this.updatedOn = new Date();
    this.createdOn = new Date();


    next();
});

userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});

const UserModel = model('User', userSchema);

module.exports = UserModel;