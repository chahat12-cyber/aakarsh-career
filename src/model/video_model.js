const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
  board: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  videoDescription: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Simple validation to check if the link is a YouTube link
        return /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?=.*v=\w+)(?:\S+)?$/.test(value);
      },
      message: props => `${props.value} is not a valid YouTube link!`,
    },
  },
});

const Video = model('Video', videoSchema);

module.exports = Video;
