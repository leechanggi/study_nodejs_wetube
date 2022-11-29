const globalTrending = (req, res) => {
  res.send('Home Page Videos');
};
const globalSearch = (req, res) => {
  res.send('Search');
};
const videoUpload = (req, res) => {
  res.send('Upload Video');
};
const videoWatch = (req, res) => {
  res.send('Watch Video');
};
const videoEdit = (req, res) => {
  res.send('Edit Video');
};
const videoRemove = (req, res) => {
  res.send('Remove Video');
};

export { globalTrending, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove };
