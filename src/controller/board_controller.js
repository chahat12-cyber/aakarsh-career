const boardModel = require('../model/board_model');
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });
const BoardController = {

    createBoard: async function(req, res) {
        try {
            // Use the 'upload.single' middleware to handle the image file upload
            upload.single('boardimage')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ success: false, message: 'Image upload error' });
                } else if (err) {
                    return res.status(500).json({ success: false, message: err });
                }
    
                const data = req.body;
                const image = req.file;
                
                // Check if both 'name' and 'boardimage' are present
                if (!data.name || !image) {
                    return res.status(400).json({ success: false, message: 'Both "name" and "boardimage" are required' });
                }
    
                const newData = new boardModel({
                    name: data.name,
                    boardimage: {
                        data: image.buffer,
                        contentType: image.mimetype,
                    },
                });
    
                await newData.save();
    
                // Create a response object that includes the _id, name, and image
                const responseObject = {
                    _id: newData._id,
                    name: data.name,
                    boardimage: newData.boardimage.data.toString('base64'),
                };
    
                res.json({ success: true, data: responseObject });
            });
        } 
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    

    fetchAllBoard: async function (req, res) {
        try {
            // Specify the field names you want in the projection
            const foundBoard = await boardModel.find({}, '_id name boardimage').lean();
    
            const formattedBoard = foundBoard.map((board) => {
                // Convert the image data to base64
                const imageBase64 = board.boardimage.data.toString('base64');
    
                return {
                    _id: board._id,
                    name: board.name,
                    boardimage: imageBase64,
                };
            });
    
            return res.json({ success: true, data: formattedBoard });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },
    

    updateBoardData: async function (req, res) {
        const boardId = req.params.id;

  try {
    // Use the 'upload.single' middleware to handle the image file upload
    upload.single('boardimage')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Image upload error' });
      } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      const updateData = req.body;
      const image = req.file;
      const existingExamType = await boardModel.findById(boardId);

      if (!existingExamType) {
        return res.status(404).json({ success: false, message: 'Exam type not found' });
      }

      // Update fields from form-data
      if (updateData.name) {
        existingExamType.name = updateData.name;
      }

      // Update the image data if a new image is provided
      if (image) {
        existingExamType.boardimage.data = image.buffer;
        existingExamType.boardimage.contentType = image.mimetype;
      }

      // Save the updated exam type
      const updatedExamType = await existingExamType.save();

      const responseObject = {
        _id: updatedExamType._id,
        name: updatedExamType.name,
        boardimage: updatedExamType.boardimage.data.toString('base64'),
      };

      return res.json({ success: true, data: responseObject });
    });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
      },

        fetchExamTypeById: async function (req, res) {
          try {
            const { id } = req.params;
        
            const foundExam = await examTypeModel.findById(id);
        
            if (!foundExam) {
              return res.status(404).json({ success: false, message: 'ExamType not found' });
            }
            const imageBase64 = foundExam.image.data.toString('base64');
        
            const responseObject = {
              _id: foundExam._id,
              examTypeName: foundExam.examTypeName,
              image: imageBase64,
            };
        
            res.json({ success: true, data: responseObject });
          } catch (ex) {
            return res.status(500).json({ success: false, message: ex });
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
        
    },

    updateBoardWithNewFields: async function (req, res) {
        try {
            const imageData = Buffer.from([]); // Set imageData to an empty Buffer
            const imageContentType = 'image/png'; // Replace with the actual content type
    
            const updateResult = await boardModel.updateMany({}, {
                $set: {
                    boardimage: {
                        data: imageData,
                        contentType: imageContentType,
                    }
                }
            });
    
            console.log(`Updated ${updateResult.nModified} document(s).`);   
           
        } catch (error) {
            console.error(error);
        }
    }
    
    
}

// BoardController.updateBoardWithNewFields();


module.exports = BoardController;