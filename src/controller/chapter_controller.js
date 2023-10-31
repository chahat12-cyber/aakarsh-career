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

        fetchChapterByFilter: async function(req,res){
          const { className, subjectId, board } = req.query;

         try {
    // Create a filter object based on the provided query parameters
    const filter = {};

    if (className) {
      filter.class = className;
    }
    if (subjectId) {
      filter.subject = subjectId;
    }
    if (board) {
      filter.board = board;
    }

    // Find chapters based on the filter
    const chapters = await chapterModel.find(filter).exec();

    return res.json({ success: true, data: chapters });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
},
updateChapterWithNewFields: async function (req, res) {
  try {
    // Use the updateMany method to update multiple chapters
    const updateResult = await chapterModel.updateMany({}, { $set: { class: '12', board: 'State Board' } });

    console.log(`Updated ${updateResult.nModified} chapter(s).`);
    
  } catch (error) {
    console.error(error);
  }
}

        
    }

    // ChapterController.updateChapterWithNewFields();

module.exports = ChapterController