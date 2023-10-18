const boardModel = require('../model/board_model');

const BoardController = {

    createBoard: async function(req, res) {
        try {
            const data = req.body;
            const newData = new boardModel(data);
            await newData.save();

            return res.json({ success: true, data: newData,});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllBoard: async function(req, res) {
        try {
            const foundboard = await boardModel.find();
           
            return res.json({ success: true, data: foundboard });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

      updateBoardData: async function(req, res) {
        try {
            const boardId = req.params.id;
            const updateData = req.body;
            console.log(boardId);
            console.log(updateData);
            const updatedUser = await boardModel.findOneAndUpdate(
                { _id: boardId },
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
    deleteBoardData: async function(req, res){
        try {
            const id = req.params.id; 
        
          
            const data = await boardModel.findById(id);
        
            if (!data) {
              return res.status(404).json({ message: 'Data not found' });
            }
    
            await boardModel.findByIdAndDelete(id);
        
            res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
          } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    }
}


module.exports = BoardController;