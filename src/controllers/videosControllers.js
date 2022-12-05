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
const videoWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, { video }));
  } else {
    return res.render(data.error404.renderPath, Object.assign({}, data.error404));
  }

  // try {
  //   const { id } = req.params;
  //   const video = await Video.findById(id);
  //   console.log(Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, { video }));
  //   return res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, { video }));
  // } catch (error) {
  //   console.log({ errMessage: error._message });
  //   res.render(data.error404.renderPath, Object.assign({}, data.error404));
  // }
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
      hashtags: hashtags.split(',').map(word => `#${word.trim()}`),
    });
    res.redirect('/');
  } catch (error) {
    console.log(Object.assign({}, ...data.videoUpload, { errMessage: error._message }));
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
