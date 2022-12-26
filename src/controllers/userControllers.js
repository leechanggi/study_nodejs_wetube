import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';

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
  req.session.destroy();
  return res.redirect('/');
};
const userWatch = (req, res) => {
  res.render(data.userWatch.renderPath, data.userWatch);
};

/** githubLogin */
const startGithubLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize';
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config);
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  if ('access_token' in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = 'https://api.github.com';

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(email => email.primary === true && email.verified === true);

    if (!emailObj) {
      return res.redirect('/login');
    }

    let user = await UserModel.findOne({ email: emailObj.email });
    if (!user) {
      console.log(userData);
      user = await UserModel.create({
        username: userData.name || userData.login,
        email: emailObj.email,
        password: '',
        name: userData.login,
        location: userData.location,
        socialOnly: true,
        avatarUrl: userData.avatarUrl,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }
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
  const user = await UserModel.findOne({ name, socialOnly: false });
  if (!user) {
    return res.status(400).render(data.rootLogin.renderPath, Object.assign({}, data.rootLogin, { errorMessage: 'This name does not exists.' }));
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render(data.rootLogin.renderPath, Object.assign({}, data.rootLogin, { errorMessage: 'Wrong password' }));
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

export { rootJoin, rootLogin, userEdit, userRemove, userLogout, userWatch, startGithubLogin, finishGithubLogin, postRootJoin, postRootLogin };
