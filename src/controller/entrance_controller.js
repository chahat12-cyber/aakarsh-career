const entranceModel = require('../model/entrance_model');

const EntranceController = {

    createEntrance: async function(req, res) {
        try {
            const studentData = req.body;
            const newUser = new entranceModel(studentData);
            await newUser.save();

            return res.json({ success: true, data: newUser, message: "User created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


    fetchAllEntrance: async function(req, res) {
        try {
           
            const foundEntrance = await entranceModel.find();
           
            return res.json({ success: true, data: foundEntrance });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchEntranceById: async function(req, res){
        const { selectedClass, selectedStream } = req.query;
      
        const entranceExams = await entranceModel.find({ class: selectedClass, stream: selectedStream });

        return res.json({ success: true, data: entranceExams });
      },

      fetchEntranceByClass: async function(req, res){
        const selectedClass  = req.params.class;
      console.log(selectedClass);
        const entranceExams = await entranceModel.find({ class: selectedClass});

        return res.json({ success: true, data: entranceExams });
      },

      updateEntranceData: async function(req, res) {
        try {
            const entranceId = req.params.id;
            const updateData = req.body;
            console.log(entranceId);
            console.log(updateData);
            const updatedUser = await entranceModel.findOneAndUpdate(
                { _id: entranceId },
                updateData,
                { new: true }
            );

            if(!updatedUser) {
                throw "Entrance Data not found!";
            }

            return res.json({ success: true, data: updatedUser });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    deleteEntranceData: async function(req, res){
        try {
            const id = req.params.id; 
        
          
            const data = await entranceModel.findById(id);
        
            if (!data) {
              return res.status(404).json({ message: 'Data not found' });
            }
    
            await entranceModel.findByIdAndDelete(id);
        
            res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
          } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    }

}

module.exports = EntranceController;