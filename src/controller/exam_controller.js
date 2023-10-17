const examModel = require('../model/exam_model');


const ExamController = {
 createExam : async function(req, res) {
    try {
        const data = req.body;
        const newData = new examModel(data);
        await newData.save();

        return res.json({ success: true, data: newData,});
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }
},

 fetchAllExams: async function(req, res) {
    try {
       
        const foundExam = await examModel.find();
       
        return res.json({ success: true, data: foundExam });
    }
    catch(ex) {
        return res.json({ success: false, message: ex });
    }
},

 getExamByFilter: async function(req,res){
        const { className, streamName, entranceName } = req.body;

        console.log('Received query parameters:', { className, streamName, entranceName });
        
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
        if (entranceName) {
          filter.entrance = entranceName;
          console.log('Adding entrance filter:', entranceName);
        }
        
        const exams = await examModel.find(filter);
        
        res.json({ exams });
},

getExamByUserId: async function(req,res){
    const userId = req.params.userId;

  try {
    // Find exams that have the user's ID in the users array
    const exams = await examModel.find({ users: userId });

    res.json({ exams });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

getExamByExamId: async function(req,res){
  const examId = req.params.examId;
  console.log(examId)
  try {
    
    const exam = await examModel.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ exam });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

updateExamData: async function (req, res) {
    try {
      const examId = req.params.id;
      const updateData = req.body;

      const updatedExam = await examModel.findOneAndUpdate(
        { _id: examId },
        updateData,
        { new: true }
      );
  
      if (!updatedExam) {
        return res.status(404).json({ success: false, message: 'Exam not found' });
      }
  
      return res.json({ success: true, data: updatedExam });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
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
    }
  
}
module.exports = ExamController;