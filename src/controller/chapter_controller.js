const chapterModel = require('../model/chapter_model');

const ChapterController = {

    createChapter: async function(req, res) {
        try {
            const data = req.body;
            const newData = new chapterModel(data);
            await newData.save();

            return res.json({ success: true, data: newData,});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    fetchChapterBySubjectId: async function(req, res){
        const subjectId = req.params.subjectId;
        try {
            
            const chapters = await chapterModel.find({ subject: subjectId }).exec();
        
            return res.json({ success: true, data: chapters });
          } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
          }
        },

        fetchChapterById: async function(req, res){
            const chapterId = req.params.Id;

  try {
    // Find the chapter by its _id (MongoDB's unique identifier)
    const chapter = await chapterModel.findById(chapterId).exec();

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    return res.json({ success: true, data: chapter });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
        fetchAllChapters: async function(req, res) {
            try {
               
                const foundClass = await chapterModel.find();
               
                return res.json({ success: true, data: foundClass });
            }
            catch(ex) {
                return res.json({ success: false, message: ex });
            }
        },
    
        updateChapter: async function(req,res){
            try{
            const chapterId = req.params.Id;
            const updateData = req.body;
            console.log(chapterId);
            console.log(updateData);
            const updatedChapter = await chapterModel.findOneAndUpdate(
                { _id: chapterId },
                updateData,
                { new: true }
            );

            if(!updatedChapter) {
                throw "Chapter Data not found!";
            }

            return res.json({ success: true, data: updatedChapter });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
 
        },
        deleteChapter: async function(req, res){
           

            try {
                const id = req.params.Id; 
            
              
                const data = await chapterModel.findById(id);
            
                if (!data) {
                  return res.status(404).json({ message: 'Data not found' });
                }
        
                await chapterModel.findByIdAndDelete(id);
            
                res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
              } catch (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({ error: 'Internal Server Error' });
              }
}
        
    }



module.exports = ChapterController