import UserModel from '../models/User';
import VideoModel from '../models/Video';
import pages from '../pages.json';

let page = { ...pages };

/** get - root */
/** Callback */
// const rootHome = (req, res) => {
//   Video.find({}, (err, doc) => {
//     const Video = doc;
//     res.render(page.rootHome.renderPath, Object.assign({}, page.rootHome, { videos: { ...Video } }));
//   });
// };

/** Promise */
const rootHome = async (req, res) => {
  try {
    const videos = await VideoModel.find({}).sort({ createdAt: 'desc' });
    return res.render(page.rootHome.renderPath, Object.assign({}, page.rootHome, { videos }));
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
  return res.render(
    page.rootSearch.renderPath,
    Object.assign({}, page.rootSearch, { videos }, { keyword })
  );
};

/** get - video */
const videoWatch = async (req, res) => {
  const { id } = req.params;
  const video = await VideoModel.findById(id).populate('owner');
  if (!video) {
    return res.render(page.error404.renderPath, Object.assign({}, page.error404));
  }
  return res.render(
    page.videoWatch.renderPath,
    Object.assign({}, page.videoWatch, { pageTitle: `Watch ${video.title}` }, { video })
  );
};

const videoUpload = (req, res) => {
  return res.render(page.videoUpload.renderPath, page.videoUpload);
};

const videoEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await VideoModel.findById(id);
  if (!video) {
    return res.status(404).render(page.error404.renderPath, Object.assign({}, page.error404));
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).render(page.error404.renderPath, Object.assign({}, page.error404));
  }
  return res.render(
    page.videoEdit.renderPath,
    Object.assign({}, page.videoEdit, { pageTitle: `Edit ${video.title}` }, { video })
  );
};

const videoRemove = async (req, res) => {
  const { id } = req.params;
  await VideoModel.findByIdAndDelete(id);
  return res.redirect('/');
};

/** POST - video */
const postVideoUpload = async (req, res) => {
  const {
    file: { path: videoUrl },
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const newVideo = await VideoModel.create({
      title,
      description,
      hashtags: VideoModel.formatHashtags(hashtags),
      videoUrl,
      owner: _id,
    });
    const user = await UserModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect('/');
  } catch (error) {
    return res.render(
      page.videoUpload.renderPath,
      Object.assign({}, ...page.videoUpload, { errMessage: error._message })
    );
  }
};

const postVideoEdit = async (req, res) => {
  const { id } = req.params;
  const video = await VideoModel.exists({ _id: id });
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.render(page.error404.renderPath, Object.assign({}, page.error404));
  }

  await VideoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: VideoModel.formatHashtags(hashtags),
  });
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export {
  rootHome,
  rootSearch,
  videoUpload,
  videoWatch,
  videoEdit,
  videoRemove,
  postVideoUpload,
  postVideoEdit,
};
