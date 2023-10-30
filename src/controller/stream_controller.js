const StreamModel = require('../model/stream_model');

const StreamController = {

    createStream: async function(req, res) {
        try {
            const data = req.body;
            const newData = new StreamModel(data);
            await newData.save();

            return res.json({ success: true, data: newData,});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


    fetchAllStream: async function(req, res) {
        try {
           
            const foundStream = await StreamModel.find();
           
            return res.json({ success: true, data: foundStream });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchStreamById: async function(req, res){
        const streamId = req.params.Id;
        console.log(streamId);
      
        try {
          const findstream = await StreamModel.findById(streamId);
      
          if (!findstream) {
            return res.status(404).json({ error: 'Exam not found' });
          }
      
      
          const formattedStream = {
            _id: findstream._id,
            stream: findstream.stream,
            
           
          };
      
          res.json({ formattedStream });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }

},
     

      updateStreamData: async function(req, res) {
        try {
            const streamId = req.params.id;
            const updateData = req.body;
            console.log(streamId);
            console.log(updateData);
            const updatedUser = await StreamModel.findOneAndUpdate(
                { _id: streamId },
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
    deleteStreamData: async function(req, res){
        try {
            const id = req.params.id; 
        
          
            const data = await StreamModel.findById(id);
        
            if (!data) {
              return res.status(404).json({ message: 'Data not found' });
            }
    
            await StreamModel.findByIdAndDelete(id);
        
            res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
          } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    }

}


module.exports = StreamController;