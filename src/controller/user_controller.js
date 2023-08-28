const UserModel = require('../model/user_model');


const UserController = {

    createAccount: async function(req, res) {
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();

            return res.json({ success: true, data: newUser, message: "User created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    signIn: async function(req, res) {
        try {
            const phonenumber = req.body.phoneNumber;
            const foundUser = await UserModel.findOne({ phoneNumber: phonenumber });
            if(!foundUser) {
                return res.json({ success: false, message: "User not found!" });
            }

            return res.json({ success: true, data: foundUser, message: "User Logged In !" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllUsers: async function(req, res) {
        try {
           
            const foundUser = await UserModel.find();
           
            return res.json({ success: true, data: foundUser });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchUserById: async function(req, res) {
        try {
           const userId = req.params.id;
           
            const foundUser = await UserModel.findOne({_id: userId});
           if(!foundUser){
            return res.json({ success: false, message: " User With This Id does not exist! " });
           }
            return res.json({ success: true, data: foundUser });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    updateUser: async function(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
            console.log(userId);
            console.log(updateData);
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },
                updateData,
                { new: true }
            );

            if(!updatedUser) {
                throw "user not found!";
            }

            return res.json({ success: true, data: updatedUser, message: "User updated!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }

}

module.exports= UserController;