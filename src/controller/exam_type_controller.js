const examTypeModel = require('../model/exam_type_model');

const multer = require('multer');

// Set up the storage engine for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ExamTypeController = {
    
    createExamType: async function (req, res) {
        try {
          // Use the 'upload.single' middleware to handle the image file upload
          upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(400).json({ success: false, message: 'Image upload error' });
            } else if (err) {
              return res.status(500).json({ success: false, message: err });
            }
      
            const data = req.body;
            const image = req.file;
      
            // Check if both 'name' and 'image' are present
            if (!data.name || !image) {
              return res.status(400).json({ success: false, message: 'Both "name" and "image" are required' });
            }
      
            const newData = new examTypeModel({
              name: data.name,
              image: {
                data: image.buffer,
                contentType: image.mimetype,
              },
            });
      
            await newData.save();
      
            // Create a response object that includes the _id, name, and image
            const responseObject = {
              _id: newData._id, // Include the _id field
              name: data.name,
              image: newData.image.data.toString('base64'), // Convert image data to base64
            };
      
            res.json({ success: true, data: responseObject });
          });
        } catch (ex) {
          return res.status(500).json({ success: false, message: ex });
        }
      },
      
      fetchAllExamType: async function (req, res) {
        try {
          const foundExams = await examTypeModel.find({}, '_id name image'); // Include '_id' in the projection
      
          const formattedExams = foundExams.map((exam) => {
            // Convert the image data to base64
            const imageBase64 = exam.image.data.toString('base64');
      
            return {
              _id: exam._id, // Include the _id field
              name: exam.name,
              image: imageBase64,
            };
          });
      
          return res.json({ success: true, data: formattedExams });
        } catch (ex) {
          return res.json({ success: false, message: ex });
        }
      },
      updateExamTypeById: async function (req, res) {
        try {
          const { id } = req.params;
          const dataToUpdate = req.body;
      
          // Use findByIdAndUpdate to update the document by ID, excluding the 'image' field
          const updatedExamType = await examTypeModel
            .findByIdAndUpdate(id, { $set: dataToUpdate }, { new: true })
            .select('name _id'); // Project only 'name' and '_id' fields
      
          if (!updatedExamType) {
            return res.status(404).json({ success: false, message: 'ExamType not found' });
          }
      
          res.json({ success: true, data: updatedExamType });
        } catch (ex) {
          return res.status(500).json({ success: false, message: ex });
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
            name: foundExam.name,
            image: imageBase64,
          };
      
          res.json({ success: true, data: responseObject });
        } catch (ex) {
          return res.status(500).json({ success: false, message: ex });
        }
      },       
      
      deleteExamTypeById: async function (req, res) {
        try {
          const { id } = req.params; // Get the ID from the request params
      
          // Use findByIdAndDelete to delete the document by ID
          const deletedExamType = await examTypeModel.findByIdAndDelete(id);
      
          if (!deletedExamType) {
            return res.status(404).json({ success: false, message: 'ExamType not found' });
          }
      
          res.json({ success: true, message: 'ExamType deleted' });
        } catch (ex) {
          return res.status(500).json({ success: false, message: ex });
        }
      }
      
      
      
}

module.exports = ExamTypeController;