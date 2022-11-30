import config from '../config.json';
const data = { ...config };

/** global */
const globalJoin = (req, res) => {
  res.render(data.globalJoin.path, data.globalJoin);
};
const globalLogin = (req, res) => {
  res.render(data.globalLogin.path, data.globalLogin);
};

/** user */
const userEdit = (req, res) => {
  res.render(data.userEdit.path, data.userEdit);
};
const userRemove = (req, res) => {
  res.render(data.userRemove.path, data.userRemove);
};
const userLogout = (req, res) => {
  res.render(data.userLogout.path, data.userLogout);
};
const userWatch = (req, res) => {
  res.render(data.userWatch.path, data.userWatch);
};

export { globalJoin, globalLogin, userEdit, userRemove, userLogout, userWatch };
