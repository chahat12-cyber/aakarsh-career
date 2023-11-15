const testModel = require('../model/test_model');

const TestController = {
   createTest: async function(req, res){
    console.log('calling here')
    try {
      const testData = req.body;
      const newTest = new testModel(testData);
      const savedQuestion = await newTest.save();
    return res.json({ success: true, data:savedQuestion });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
    },
     fetchAllTest: async function(req,res){
        try{
            const allData = await testModel.find();
            return res.json({success: true, data: allData});

        }catch(error){
            return res.json({success: false, message: error.message})
        }
     }, 

     fetchTestById: async function(req,res){
        try {
    const foundTest = await testModel.findById(req.params.id);
    res.json(foundTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
     fetchTestByExamType: async function(req,res){
         try {
    const foundTests = await testModel.find({ examType: req.query.examType });
    return res.json({data: foundTests});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
     },
     updateTest: async function(req, res) {

  try {
    const updatedTest = await testModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      console.log('Test not found.');
      return res.status(404).json({ error: 'Test not found.' });
    }

    console.log('Updated Test:', updatedTest);
    res.json(updatedTest);
  } catch (error) {
    console.error('Error updating test:', error.message);
    res.status(500).json({ error: error.message });
  }
},
 deleteTest: async function(req,res){
     try {
    const deletedTest = await testModel.findByIdAndDelete(req.params.id);
    res.json({success: true, message: "Test deleted successfully!"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 }

};


module.exports = TestController;