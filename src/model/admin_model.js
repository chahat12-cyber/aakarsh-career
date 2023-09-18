const { Schema, model } = require('mongoose');
const { type } = require('os');

const adminSchema=  new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: [true, "Email Address must be provided"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password must be provided"],
    },
    phoneNumber: {
        type: Number
    }, 
},

{
    timestamps: true
}
);

const AdminModel = model('admin', adminSchema);
module.exports = AdminModel;