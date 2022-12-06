import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, minLength: 8, maxLength: 16 },
  description: { type: String, require: true, maxLength: 24 },
  createdAt: { type: Date, require: true, default: Date.now },
  hashtags: [{ type: String, require: false, trim: true }],
  meta: {
    views: { type: Number, require: true, default: 0 },
    rating: { type: Number, require: true, default: 0 },
  },
});

/** 모델이 만들어지기 이전 시점에 인터셉트 */
/** 1, mongoos middleware : pre */
// videoSchema.pre('save', async function () {
//   this.hashtags = this.hashtags[0].split(',').map(word => (word.startsWith('#') ? word : `#${word}`));
// });

/** 2, mongoos static */
videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags.split(',').map(word => (word.startsWith('#') ? word : `#${word}`));
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
