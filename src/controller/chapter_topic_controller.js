const chapterTopicModel = require('../model/chapter_topic_model');

const ChapterTitleController = {

    createTopic: async function(req, res) {
        try {
            const data = req.body;
            const newData = new chapterTopicModel(data);
            await newData.save();

            return res.json({ success: true, data: newData,});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    fetchAllTopics: async function(req, res) {
            try {
               
                const foundTopic = await chapterTopicModel.find();
               
                return res.json({ success: true, data: foundTopic });
            }
            catch(ex) {
                return res.json({ success: false, message: ex });
            }
        },
   fetchTopicByChapter: async function (req, res) {
    const { chapter } = req.query; // Retrieve chapter name from req.query
    console.log(chapter);

    try {
        const topics = await chapterTopicModel.find({
            chapter: { $regex: new RegExp(chapter, 'i') },
        }).exec();

        return res.json({ success: true, data: topics });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
},
        fetchTopicById: async function(req, res){
            const topicId = req.params.Id;

  try {
    const topic = await chapterTopicModel.findById(topicId).exec();

    if (!topic) {
      return res.status(404).json({ success: false, message: 'Topic not found' });
    }

    return res.json({ success: true, data: topic });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
fetchTopicByFilter: async function(req,res){
          const { className, subjectId, board, chapter } = req.query;

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
    if (chapter) {
      filter.chapter = chapter;
    }

    // Find chapters based on the filter
    const topics = await chapterTopicModel.find(filter).exec();

    return res.json({ success: true, data: topics });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

        },
     updateTopic: async function(req,res){
            try{
            const topicId = req.params.Id;
            const updateData = req.body;
            console.log(topicId);
            console.log(updateData);
            const updatedChapter = await chapterTopicModel.findOneAndUpdate(
                { _id: topicId },
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
        deleteTopic: async function(req, res){
            try {
                const id = req.params.Id; 
            
              
                const data = await chapterTopicModel.findById(id);
            
                if (!data) {
                  return res.status(404).json({ message: 'Data not found' });
                }
        
                await chapterTopicModel.findByIdAndDelete(id);
            
                res.status(204).json({message: 'Data Deleted'}); // Respond with a 204 No Content status indicating success
              } catch (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({ error: 'Internal Server Error' });
              }
            }
};

module.exports = ChapterTitleController