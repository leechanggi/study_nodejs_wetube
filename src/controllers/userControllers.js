import UserModel from '../models/User';
import config from '../config.json';

let data = { ...config };

/** get - root */
const rootJoin = (req, res) => {
  res.render(data.rootJoin.renderPath, data.rootJoin);
};
const rootLogin = (req, res) => {
  res.render(data.rootLogin.renderPath, data.rootLogin);
};

/** get - user */
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

/** POST - root */
const postRootJoin = async (req, res) => {
  const { username, email, password, name, location } = req.body;
  try {
    await UserModel.create({
      username,
      email,
      password,
      name,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.render(data.rootJoin.renderPath, Object.assign({}, ...data.rootJoin), { errMessage: error._message });
  }
};

export { rootJoin, rootLogin, userEdit, userRemove, userLogout, userWatch, postRootJoin };
