const examModel = require('../model/exam_model');
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });


const ExamController = {
  createExam: async function (req, res) {
    console.log('Calling createExam');
    try {
        // Use the 'upload.single' middleware to handle the image file upload
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: 'Image upload error' });
            } else if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = req.body;
            const image = req.file;

            if (!image) {
                return res.status(400).json({ success: false, message: 'Image file is required' });
            }

            console.log('Received data:', data); 
            console.log('Received image:', image);

            let usersArray;
            try {
                usersArray = JSON.parse(data.users);
            } catch (ex) {
                return res.status(400).json({ success: false, message: 'Invalid JSON data in the users field' });
            }

            const newData = new examModel({
                examName: data.examName,
                description: data.description,
                entrance: data.entrance,
                stream: data.stream,
                class: data.class,
                examType: data.examType,
                image: {
                    data: image.buffer,
                    contentType: image.mimetype,
                },
                users: usersArray,
            });

            await newData.save();
            console.log('Created exam:', newData);

            // Create a response object
            const responseObject = {
                _id: newData._id,
                examName: data.examName,
                description: data.description,
                entrance: data.entrance,
                stream: data.stream,
                class: data.class,
                examType: data.examType,
                image: newData.image.data.toString('base64'),
                users: newData.users,
            };

            res.json({ success: true, data: responseObject });
        });
    } catch (ex) {
        return res.status(500).json({ success: false, message: ex.message });
    }
},



  
  fetchAllExams: async function (req, res) {
    try {
      // Specify the field names you want in the projection, including 'examType'
      const foundExams = await examModel.find({}, '_id examName description stream class image examType users').lean();
  
      const formattedExams = foundExams.map((exam) => {
        // Convert the image data to base64
        const imageBase64 = exam.image.data.toString('base64');
  
        return {
          _id: exam._id,
          examName: exam.examName,
          description: exam.description,
          stream: exam.stream,
          class: exam.class,
          examType: exam.examType,
          image: imageBase64,
          users: exam.users,
        };
      });
  
      return res.json({ success: true, data: formattedExams });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  
  getExamByFilter: async function (req, res) {
    console.log(`calling`)
    const { className, streamName,  } = req.query;
   
    console.log('Received query parameters:', { className, streamName, });
  
    // Create a filter object based on the provided query parameters
    const filter = {};
  
    if (className) {
      filter.class = className;
      console.log('Adding class filter:', className);
    }
    if (streamName) {
      filter.stream = streamName;
      console.log('Adding stream filter:', streamName);
    }
    // if (examType) {
    //   filter.examType = examType;
    //   console.log('Adding entrance filter:', examType);
    // }
  
    try {
      const exams = await examModel.find(filter);

      const formattedExams = exams.map((exam) => {
        // Convert the image data to base64
        const imageBase64 = exam.image.data.toString('base64');
  
        return {
          _id: exam._id, // Include the _id field
          examName: exam.examName,
          description: exam.description,
          stream: exam.stream,
          class: exam.class,
          examType: exam.examType,
          image: imageBase64,
          users: exam.users,
        };
      });
  
      // Include the query parameters in the response body
      return res.json({ success: true, data: formattedExams});
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

getExamByUserId: async function(req,res){
    const userId = req.params.userId;

  try {
    // Find exams that have the user's ID in the users array
    const exams = await examModel.find({ users: userId });
    const formattedExams = exams.map((exam) => {
      // Convert the image data to base64
      const imageBase64 = exam.image.data.toString('base64');

      return {
        _id: exam._id, // Include the _id field
        examName: exam.examName,
        description: exam.description,
        stream: exam.stream,
        class: exam.class,
        examType: exam.examType,
        image: imageBase64,
        users: exam.users
      };
    });

    // Include the query parameters in the response body
    return res.json({ success: true, data: formattedExams});
   
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
getExamByExamId: async function (req, res) {
  const examId = req.params.examId;
  console.log(examId);

  try {
    const findexam = await examModel.findById(examId);

    if (!findexam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Format the exam here (no need to use .map())
    const imageBase64 = findexam.image.data.toString('base64');
    const formattedExam = {
      _id: findexam._id,
      examName: findexam.examName,
      description: findexam.description,
      stream: findexam.stream,
      class: findexam.class,
      examType: findexam.examType,
      image: imageBase64,
      users: findexam.users,
    };

    res.json({ formattedExam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

updateExamData: async function(req, res) {
  const examId = req.params.id;

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
      const existingExam = await examModel.findById(examId);

      if (!existingExam) {
        return res.status(404).json({ success: false, message: 'Exam not found' });
      }

      // Update fields from form-data
      if (updateData.examName) {
        existingExam.examName = updateData.examName;
      }
      if (updateData.description) {
        existingExam.description = updateData.description;
      }
      if (updateData.entrance) {
        existingExam.entrance = updateData.entrance;
      }
      if (updateData.stream) {
        existingExam.stream = updateData.stream;
      }
      if (updateData.class) {
        existingExam.class = updateData.class;
      }
      if (updateData.examType) {
        existingExam.examType = updateData.examType;
      }

      // Update the image data if a new image is provided
      if (image) {
        existingExam.image.data = image.buffer;
        existingExam.image.contentType = image.mimetype;
      }

      // Save the updated exam
      const updatedExam = await existingExam.save();

      const responseObject = {
        _id: updatedExam._id,
        examName: updatedExam.examName,
        description: updatedExam.description,
        entrance: updatedExam.entrance,
        stream: updatedExam.stream,
        class: updatedExam.class,
        examType: updatedExam.examType,
        image: updatedExam.image.data.toString('base64'),
      };

      return res.json({ success: true, data: responseObject });
    });
  } catch (ex) {
    return res.status(500).json({ success: false, message: ex.message });
  }
},

  deleteExamData: async function(req, res)
    {
        try {
            const id = req.params.id; 
            const data = await examModel.findById(id);
            if (!data) {
              return res.status(404).json({ message: 'Data not found' });
            }
            await examModel.findByIdAndDelete(id);
            res.status(204).json({message: 'Data Deleted'}); 
            }
            catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },

    updateExamWithNewFields: async function (req, res) {
      
      
      try {
        const updateResult = await examModel.updateMany({}, { $set: { examType: "" } });
    
        console.log(`Updated ${updateResult.nModified} exam(s).`);
      } catch (error) {
        console.error(error);
      }
    }
    
    
  
}

// ExamController.updateExamWithNewFields();
module.exports = ExamController;