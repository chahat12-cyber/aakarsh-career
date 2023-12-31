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

     fetchUserByExamId: async function(req,res){
        const examId = req.params.examId;
       console.log(examId);
     try {
    // Find users who have the exam ID in their 'exams' array
    const users = await UserModel.find({ exams: examId });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
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
    },
    
    deleteUser: async function(req, res){
        try {
            const userId = req.params.id; 
            const user = await UserModel.findById(userId);        
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }

            await UserModel.findByIdAndDelete(userId);
        
            res.status(204).json({message: 'User Deleted'}); // Respond with a 204 No Content status indicating success
          } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    },

//      updateUserWithNewFields: async function(req,res){
//        console.log('inside here');
//     var newvalues = {$set: {selectedBoard: "Competitive"} };
//     UserModel.updateMany(newvalues);
// }
 updateUserWithNewFields: async function (req, res) {
    try {
      const updateResult = await UserModel.updateMany({}, { $set: { exams: ["652e22c6ed24413eb00eb8d2"] } });
  
      console.log(`Updated ${updateResult.nModified} user(s).`);
      
    } catch (error) {
      console.error(error);
      
    }
  }
}



// UserController.updateUserWithNewFields();

module.exports= UserController;