import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: Date, require: true, default: Date.now },
  hashtags: [{ type: String, require: false }],
  meta: {
    views: { type: Number, require: true, default: 0 },
    rating: { type: Number, require: true, default: 0 },
  },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
