import bcrypt from 'bcryptjs';

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
  const { username, email, password, password2, name, location } = req.body;
  if (password !== password2) {
    return res.status(400).render(data.rootJoin.renderPath, Object.assign({}, data.rootJoin, { errorMessage: 'Password confirmation does not match.' }));
  }
  const exists = await UserModel.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render(data.rootJoin.renderPath, Object.assign({}, data.rootJoin, { errorMessage: 'This username/email is already taken.' }));
  }
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
    return res.render(data.rootJoin.renderPath, Object.assign({}, ...data.rootJoin, { errMessage: error._message }));
  }
};

const postRootLogin = async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });
  if (!name) {
    return res.status(400).render(data.rootLogin.renderPath, Object.assign({}, data.rootLogin, { errorMessage: 'This name does not exists.' }));
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render(data.rootLogin.renderPath, Object.assign({}, data.rootLogin, { errorMessage: 'Wrong password' }));
  }
  console.log('LOG USER IN! COMMING SOON!');
  return res.redirect('/');
};

export { rootJoin, rootLogin, userEdit, userRemove, userLogout, userWatch, postRootJoin, postRootLogin };
