const classModel = require('../model/class_model');

const ClassController = {

    createClass: async function(req, res) {
        try {
            const data = req.body;
            const newData = new classModel(data);
            await newData.save();

            return res.json({ success: true, data: newData,});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


    fetchAllClass: async function(req, res) {
        try {
           
            const foundClass = await classModel.find();
           
            return res.json({ success: true, data: foundClass });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


     

      updateClassData: async function(req, res) {
        try {
            const classId = req.params.id;
            const updateData = req.body;
            console.log(classId);
            console.log(updateData);
            const updatedUser = await classModel.findOneAndUpdate(
                { _id: classId },
                updateData,
                { new: true }
            );

            if(!updatedUser) {
                throw "Board Data not found!";
            }

            return res.json({ success: true, data: updatedUser });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    deleteClassData: async function(req, res){
        try {
            const id = req.params.id; 
        
          
            const data = await classModel.findById(id);
        
            if (!data) {
              return res.status(404).json({ message: 'Data not found' });
            }
    
            await classModel.findByIdAndDelete(id);
        
            res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
          } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    }

}


module.exports = ClassController;