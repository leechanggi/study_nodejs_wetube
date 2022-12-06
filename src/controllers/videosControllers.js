import VideoModel from '../models/video';
import config from '../config.json';
let data = { ...config };

/** get - global */
/** Callback */
// const globalHome = (req, res) => {
//   Video.find({}, (err, doc) => {
//     const Video = doc;
//     res.render(data.globalHome.renderPath, Object.assign({}, data.globalHome, { videos: { ...Video } }));
//   });
// };

/** Promise */
const globalHome = async (req, res) => {
  try {
    const videos = await VideoModel.find({});
    console.log(videos);
    return res.render(data.globalHome.renderPath, Object.assign({}, data.globalHome, { videos }));
  } catch (error) {
    return res.render('server-error', { error });
  }
};

const globalSearch = (req, res) => {
  return res.render(data.globalSearch.renderPath, data.globalSearch);
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

const videoRemove = (req, res) => {
  return res.render(data.videoRemove.renderPath, data.videoRemove);
};

/** POST - video */
const postVideoUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await VideoModel.create({
      title,
      description,
      hashtags: hashtags,
    });
    res.redirect('/');
  } catch (error) {
    console.log(Object.assign({}, ...data.videoUpload, { errMessage: error._message }));
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
    hashtags: hashtags,
  });
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export { globalHome, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit };
