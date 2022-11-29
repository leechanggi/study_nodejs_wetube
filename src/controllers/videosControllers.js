const globalTrending = (req, res) => {
  res.render('app');
};
const globalSearch = (req, res) => {
  res.send('Search');
};
const videoUpload = (req, res) => {
  res.send('Upload Video');
};
const videoWatch = (req, res) => {
  res.render('videoWatch');
};
const videoEdit = (req, res) => {
  res.send(`<h1>Edit Video #${req.params.id}</h1>`);
};
const videoRemove = (req, res) => {
  res.send(`<h1>Remove Video #${req.params.id}</h1>`);
};

export { globalTrending, globalSearch, videoUpload, videoWatch, videoEdit, videoRemove };
