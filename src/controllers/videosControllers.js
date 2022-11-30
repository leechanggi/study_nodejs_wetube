import config from '../config.json';
const data = { ...config };

let videos = [
  { title: 'Video #1', rating: 5, comments: 4, createdAt: '2 minutes ago', views: 59, id: 1 },
  { title: 'Video #2', rating: 4, comments: 3, createdAt: '3 minutes ago', views: 49, id: 2 },
  { title: 'Video #3', rating: 3, comments: 2, createdAt: '4 minutes ago', views: 39, id: 3 },
];

/** global */
const globalApp = (req, res) => {
  res.render(data.globalApp.path, Object.assign(data.globalApp, { videos }));
};
const globalSearch = (req, res) => {
  res.render(data.globalSearch.path, data.globalSearch);
};

/** videos */
const videoWatch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render(data.videoWatch.path, Object.assign({}, data.videoWatch, { pageTitle: `Watch ${video.title}` }, video));
};
const videoUpload = (req, res) => {
  res.render(data.videoUpload.path, data.videoUpload);
};
const videoEdit = (req, res) => {
  res.render(data.videoEdit.path, data.videoEdit);
};
const videoRemove = (req, res) => {
  res.render(data.videoRemove.path, data.videoRemove);
};

export { globalApp, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove };
