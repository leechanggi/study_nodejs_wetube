import Video from '../models/video';
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
    const videos = await Video.find({});
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
const videoWatch = (req, res) => {
  return res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }));
};
const videoUpload = (req, res) => {
  return res.render(data.videoUpload.renderPath, data.videoUpload);
};
const videoEdit = (req, res) => {
  return res.render(data.videoEdit.renderPath, Object.assign({}, data.videoEdit, { pageTitle: `Edit ${video.title}` }));
};
const videoRemove = (req, res) => {
  return res.render(data.videoRemove.renderPath, data.videoRemove);
};

/** POST - video */
const postVideoUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(',').map(word => `#${word}`),
    });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.render(data.videoUpload.renderPath, Object.assign({}, ...data.videoUpload, { errMessage: error._message }));
  }
};
const postVideoEdit = (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;
  const title = reqBody.title;
  res.redirect(`/videos/${id}`);
};

export { globalHome, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit };
