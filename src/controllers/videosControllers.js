import config from '../config.json';
let data = { ...config };
let videos = [
  { title: 'Video #1', rating: 5, comments: 4, createdAt: '2 minutes ago', views: 1, id: 1 },
  { title: 'Video #2', rating: 4, comments: 3, createdAt: '3 minutes ago', views: 49, id: 2 },
  { title: 'Video #3', rating: 3, comments: 2, createdAt: '4 minutes ago', views: 39, id: 3 },
];

/** get - global */
const globalApp = (req, res) => {
  res.render(data.globalApp.renderPath, Object.assign({}, data.globalApp, { videos }));
};
const globalSearch = (req, res) => {
  res.render(data.globalSearch.renderPath, data.globalSearch);
};

/** get - video */
const videoWatch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render(data.videoWatch.renderPath, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, { video }));
};
const videoUpload = (req, res) => {
  res.render(data.videoUpload.renderPath, data.videoUpload);
};
const videoEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render(data.videoEdit.renderPath, Object.assign({}, data.videoEdit, { pageTitle: `Edit ${video.title}` }, { video }));
};
const videoRemove = (req, res) => {
  res.render(data.videoRemove.renderPath, data.videoRemove);
};

/** POST - video */
const postVideoUpload = (req, res) => {
  const newVideo = Object.assign({}, req.body, { rating: 0 }, { comments: 0 }, { createdAt: 'just now' }, { views: 0 }, { id: videos.length + 1 });
  const newVideos = [...videos, newVideo];
  videos = newVideos;
  console.log(videos);
  res.redirect('/');
};

const postVideoEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  const reqBody = req.body;
  const title = reqBody.title;
  video.title = title;
  console.log(videos);
  res.redirect(`/videos/${id}`);
};

export { globalApp, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit };
