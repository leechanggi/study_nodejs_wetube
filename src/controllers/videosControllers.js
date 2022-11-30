import data from '../config.json';

/** global */
const globalApp = (req, res) => {
  res.render(data.globalApp.path, data.globalApp);
};
const globalSearch = (req, res) => {
  res.render(data.globalSearch.path, data.globalSearch);
};

/** videos */
const videoUpload = (req, res) => {
  res.render(data.videoUpload.path, data.videoUpload);
};
const videoWatch = (req, res) => {
  res.render(data.videoWatch.path, data.videoWatch);
};
const videoEdit = (req, res) => {
  res.render(data.videoEdit.path, data.videoEdit);
};
const videoRemove = (req, res) => {
  res.render(data.videoRemove.path, data.videoRemove);
};

export { globalApp, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove };
