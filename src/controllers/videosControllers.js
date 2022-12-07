import VideoModel from '../models/video';
import config from '../config.json';

let data = { ...config };

/** get - root */
/** Callback */
// const rootHome = (req, res) => {
//   Video.find({}, (err, doc) => {
//     const Video = doc;
//     res.render(data.rootHome.renderPath, Object.assign({}, data.rootHome, { videos: { ...Video } }));
//   });
// };

/** Promise */
const rootHome = async (req, res) => {
  try {
    const videos = await VideoModel.find({}).sort({ createdAt: 'desc' });
    return res.render(data.rootHome.renderPath, Object.assign({}, data.rootHome, { videos }));
  } catch (error) {
    return res.render('server-error', { error });
  }
};

const rootSearch = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await VideoModel.find({
      title: new RegExp(keyword, 'i'),
    });
  }
  return res.render(data.rootSearch.renderPath, Object.assign({}, data.rootSearch, { videos }, { keyword }));
};

/** get - video */
const videoWatch = async (req, res) => {
  const { id } = req.params;
  const video = await VideoModel.findById(id);
  if (!video) {
    return res.render(data.error404.renderPath, Object.assign({}, data.error404));
  }
  return res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, { video }));
};

const videoUpload = (req, res) => {
  return res.render(data.videoUpload.renderPath, data.videoUpload);
};

const videoEdit = async (req, res) => {
  const { id } = req.params;
  const video = await VideoModel.findById(id);
  if (!video) {
    return res.render(data.error404.renderPath, Object.assign({}, data.error404));
  }
  return res.render(data.videoEdit.renderPath, Object.assign({}, data.videoEdit, { pageTitle: `Edit ${video.title}` }, { video }));
};

const videoRemove = async (req, res) => {
  const { id } = req.params;
  await VideoModel.findByIdAndDelete(id);
  return res.redirect('/');
};

/** POST - video */
const postVideoUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await VideoModel.create({
      title,
      description,
      hashtags: VideoModel.formatHashtags(hashtags),
    });
    return res.redirect('/');
  } catch (error) {
    return res.render(data.videoUpload.renderPath, Object.assign({}, ...data.videoUpload, { errMessage: error._message }));
  }
};

const postVideoEdit = async (req, res) => {
  const { id } = req.params;
  const video = await VideoModel.exists({ _id: id });
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.render(data.error404.renderPath, Object.assign({}, data.error404));
  }

  await VideoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: VideoModel.formatHashtags(hashtags),
  });
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export { rootHome, rootSearch, videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit };
