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
    res.render(data.globalHome.renderPath, Object.assign({}, data.globalHome, { videos }));
  } catch (error) {
    res.render('server-error', { error });
  }
};

const globalSearch = (req, res) => {
  res.render(data.globalSearch.renderPath, data.globalSearch);
};

/** get - video */
const videoWatch = (req, res) => {
  res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }));
};
const videoUpload = (req, res) => {
  res.render(data.videoUpload.renderPath, data.videoUpload);
};
const videoEdit = (req, res) => {
  res.render(data.videoEdit.renderPath, Object.assign({}, data.videoEdit, { pageTitle: `Edit ${video.title}` }));
};
const videoRemove = (req, res) => {
  res.render(data.videoRemove.renderPath, data.videoRemove);
};

/** POST - video */
const postVideoUpload = (req, res) => {
  const newVideo = Object.assign({}, req.body, { rating: 0 }, { comments: 0 }, { createdAt: 'just now' }, { views: 0 });
  res.redirect('/');
};
const postVideoEdit = (req, res) => {
  const { id } = req.params;
  const reqBody = req.body;
  const title = reqBody.title;
  video.title = title;
  res.redirect(`/videos/${id}`);
};

export { globalHome, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit };
