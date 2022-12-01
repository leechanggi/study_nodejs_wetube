import config from '../config.json';
const data = { ...config };

/** global */
const globalJoin = (req, res) => {
  res.render(data.globalJoin.renderPath, data.globalJoin);
};
const globalLogin = (req, res) => {
  res.render(data.globalLogin.renderPath, data.globalLogin);
};

/** user */
const userEdit = (req, res) => {
  res.render(data.userEdit.renderPath, data.userEdit);
};
const userRemove = (req, res) => {
  res.render(data.userRemove.renderPath, data.userRemove);
};
const userLogout = (req, res) => {
  res.render(data.userLogout.renderPath, data.userLogout);
};
const userWatch = (req, res) => {
  res.render(data.userWatch.renderPath, data.userWatch);
};

export { globalJoin, globalLogin, userEdit, userRemove, userLogout, userWatch };
