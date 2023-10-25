const subjectModel = require('../model/subject_model');
const streamModel = require('../model/stream_model');
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });
const StreamController = {

    createSubject: async function(req, res) {
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
    
                // Check if req.file is defined
                if (!image) {
                    return res.status(400).json({ success: false, message: 'Image file is required' });
                }
    
    
                // Create a new exam using the examModel
                const newData = new subjectModel({
                    subjectName: data.subjectName,
                    image: {
                        data: image.buffer,
                        contentType: image.mimetype,
                    },
                    stream: data.stream 

                });
    
                await newData.save();
                console.log(newData);
    
                // Create a response object
                const responseObject = {
                    _id: newData._id,
                    subjectName: data.subjectName,
                    image: newData.image.data.toString('base64'),
                    stream: data.stream
                    
                };
    
                res.json({ success: true, data: responseObject });
            });
        } catch (ex) {
            return res.status(500).json({ success: false, message: ex.message });
        }
},
fetchAllSubject: async function (req, res) {
    try {
        // Specify the field names you want in the projection, including 'examType'
        const foundSubjects = await subjectModel.find({}, '_id subjectName description stream class image examType users').lean();
      
        const formattedSubjects = foundSubjects.map((subject) => {
          // Convert the image data to base64
          const imageBase64 = subject.image.data.toString('base64');
      
          return {
            _id: subject._id,
            subjectName: subject.subjectName, // Changed 'examName' to 'subjectName'
            image: imageBase64,
            stream: subject.stream
          };
        });
      
        return res.json({ success: true, data: formattedSubjects });
      } catch (ex) {
        return res.status(500).json({ success: false, message: ex.message }); // Use res.status(500)
      }
    },
    
    fetchSubjectsByStream: async function (req, res) {
        try {
          const selectedStream = req.body.stream;
          console.log(selectedStream);
          // Find the stream document for the selected stream
          const stream = await streamModel.findOne({ _id: selectedStream });
           
          if (!stream) {
            return res.status(404).json({ success: false, message: 'Stream not found' });
          }
      
          // Use the stream's ObjectId to populate subjects
          const subjects = await subjectModel.find({ stream: stream._id }).exec();
          const formattedSubjects = subjects.map((subject) => {
            // Convert the image data to base64
            const imageBase64 = subject.image.data.toString('base64');
        
            return {
              _id: subject._id,
              subjectName: subject.subjectName, // Changed 'examName' to 'subjectName'
              image: imageBase64,
              stream: subject.stream
            };
          });
          return res.json({ success: true, data: formattedSubjects });
        } catch (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      },
      updateSubjectById: async function (req, res) {
        try {
          const subjectId = req.params.id;
          const updateData = req.body;
      
          // Use the 'upload.single' middleware to handle the image file upload
          upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(400).json({ success: false, message: 'Image upload error' });
            } else if (err) {
              return res.status(500).json({ success: false, message: err });
            }
      
            const updatedImage = req.file; // This will contain the updated image
      
            // Find the existing exam
            const existingSubject = await subjectModel.findById(subjectId);
      
            if (!existingSubject) {
              return res.status(404).json({ success: false, message: 'Exam not found' });
            }
      
            // Update exam properties (excluding the image)
            existingSubject.subjectName = updateData.subjectName || existingSubject.subjectName;
           
            if (updatedImage) {
              // Update the image if a new one was provided
              existingSubject.image.data = updatedImage.buffer;
              existingSubject.image.contentType = updatedImage.mimetype;
            }
      
            // Save the updated exam
            const updatedSubject = await existingSubject.save();
            const responseObject = {
              _id: updatedSubject._id, // Include the _id field
              subjectName: updatedSubject.subjectName,
              image: updatedSubject.image.data.toString('base64'), // Convert image data to base64
             
            };
            return res.json({ success: true, data: responseObject });
          });
        } catch (error) {
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
      },
      deleteSubjectById: async function (req, res) {
        try {
          const { id } = req.params; // Get the ID from the request params
      
          const deletedExamType = await subjectModel.findByIdAndDelete(id);
      
          if (!deletedExamType) {
            return res.status(404).json({ success: false, message: 'ExamType not found' });
          }
      
          res.json({ success: true, message: 'ExamType deleted' });
        } catch (ex) {
          return res.status(500).json({ success: false, message: ex });
        }
      }
      
}

module.exports = StreamController;