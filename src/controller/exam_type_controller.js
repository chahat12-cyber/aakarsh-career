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
            if (!data.examTypeName || !image) {
              return res.status(400).json({ success: false, message: 'Both "name" and "image" are required' });
            }
      
            const newData = new examTypeModel({
              examTypeName: data.examTypeName,
              image: {
                data: image.buffer,
                contentType: image.mimetype,
              },
            });
      
            await newData.save();
      
            // Create a response object that includes the _id, name, and image
            const responseObject = {
              _id: newData._id, // Include the _id field
              examTypeName: data.examTypeName,
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
          // Specify the field names you want in the projection
          const foundExams = await examTypeModel.find({}, '_id examTypeName image').lean();
      
          const formattedExams = foundExams.map((exam) => {
            // Convert the image data to base64
            const imageBase64 = exam.image.data.toString('base64');
      
            return {
              _id: exam._id, // Include the _id field
              examTypeName: exam.examTypeName, // Correct field name
              image: imageBase64,
            };
          });
      
          return res.json({ success: true, data: formattedExams });
        } catch (ex) {
          return res.json({ success: false, message: ex });
        }
      },
      
      
      updateExamTypeById: async function (req, res) {
  const examTypeId = req.params.id;

  try {
    // Use the 'upload.single' middleware to handle the image file upload
    upload.single('image')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: 'Image upload error' });
      } else if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      const updateData = req.body;
      const image = req.file;
      const existingExamType = await examTypeModel.findById(examTypeId);

      if (!existingExamType) {
        return res.status(404).json({ success: false, message: 'Exam type not found' });
      }

      // Update fields from form-data
      if (updateData.examTypeName) {
        existingExamType.examTypeName = updateData.examTypeName;
      }

      // Update the image data if a new image is provided
      if (image) {
        existingExamType.image.data = image.buffer;
        existingExamType.image.contentType = image.mimetype;
      }

      // Save the updated exam type
      const updatedExamType = await existingExamType.save();

      const responseObject = {
        _id: updatedExamType._id,
        examTypeName: updatedExamType.examTypeName,
        image: updatedExamType.image.data.toString('base64'),
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
      
      deleteExamTypeById: async function (req, res) {
        try {
          const { id } = req.params; // Get the ID from the request params
      
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