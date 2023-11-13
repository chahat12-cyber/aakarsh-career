const videoModel = require('../model/video_model');

const VideoController = {

   createVideo: async function (req, res) {
  try {
    const videoData = req.body;
    const newVideo = new videoModel(videoData);
    const savedVideo = await newVideo.save();

    const responseObject = {
      _id: savedVideo._id,
      board: savedVideo.board,
      class: savedVideo.class,
      subject: savedVideo.subject,
      chapter: savedVideo.chapter,
      topic: savedVideo.topic,
      videoName: savedVideo.videoName,
      videoDescription: savedVideo.videoDescription,
      videoLink: savedVideo.videoLink,
    };

    return res.json({ success: true, data: responseObject });
  } catch (error) {
    // Correct the variable name from "ex" to "error"
    return res.json({ success: false, message: error.message });
  }
},

 fetchAllVideos: async function (req, res) {
    console.log('calling this ')
  try {
    const allVideos = await videoModel.find().lean(); // Use await to wait for the asynchronous operation
console.log(allVideos);
    const formattedVideos = allVideos.map((video) => ({
      _id: video._id,
      board: video.board,
      class: video.class,
      subject: video.subject,
      chapter: video.chapter,
      topic: video.topic,
      videoName: video.videoName,
      videoDescription: video.videoDescription,
      videoLink: video.videoLink,
    }));

    return res.json({ success: true, data: formattedVideos });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
},
fetchVideoById: async function (req, res) {
  const videoId = req.params.id; // Assuming the video ID is passed in the request parameters

  try {
    const video = await videoModel.findById(videoId).lean();

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const responseObject = {
      _id: video._id,
      board: video.board,
      class: video.class,
      subject: video.subject,
      chapter: video.chapter,
      topic: video.topic,
      videoName: video.videoName,
      videoDescription: video.videoDescription,
      videoLink: video.videoLink,
    };

    return res.json({ success: true, data: responseObject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
fetchVideosByFilters: async function (req, res) {
  const { videoClass, videoChapter, videoBoard, videoSubject, videoTopic } = req.query;

  const filters = {};

  if (videoClass) filters.class = videoClass;
  if (videoChapter) filters.chapter = videoChapter;
  if (videoBoard) filters.board = videoBoard;
  if (videoSubject) filters.subject = videoSubject;
  if (videoTopic) filters.topic = videoTopic;

  try {
    const videos = await videoModel.find(filters).lean();

    const formattedVideos = videos.map((video) => ({
      _id: video._id,
      board: video.board,
      class: video.class,
      subject: video.subject,
      chapter: video.chapter,
      topic: video.topic,
      videoName: video.videoName,
      videoDescription: video.videoDescription,
      videoLink: video.videoLink,
    }));

    return res.json({ success: true, data: formattedVideos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
updateVideoById: async function (req, res) {
  const videoId = req.params.id; // Assuming the video ID is passed in the request parameters
  const updatedVideoData = req.body; // Assuming the updated video data is sent in the request body

  try {
    const updatedVideo = await videoModel.findByIdAndUpdate(
      videoId,
      updatedVideoData,
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const responseObject = {
      _id: updatedVideo._id,
      board: updatedVideo.board,
      class: updatedVideo.class,
      subject: updatedVideo.subject,
      chapter: updatedVideo.chapter,
      topic: updatedVideo.topic,
      videoName: updatedVideo.videoName,
      videoDescription: updatedVideo.videoDescription,
      videoLink: updatedVideo.videoLink,
    };

    return res.json({ success: true, data: responseObject, message: 'Video updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},


 deleteVideo: async function (req, res) {
  const videoId = req.params.id; // Assuming the video ID is passed in the request parameters

  try {
    const deletedVideo = await videoModel.findByIdAndRemove(videoId);

    if (!deletedVideo) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    return res.json({ success: true, data: deletedVideo, message: 'Video deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},

    }

    module.exports = VideoController