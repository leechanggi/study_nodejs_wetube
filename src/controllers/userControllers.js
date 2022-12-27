import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';

import UserModel from '../models/User';
import pages from '../pages.json';

let page = { ...pages };

/** get - root */
const rootJoin = (req, res) => {
  res.render(page.rootJoin.renderPath, page.rootJoin);
};
const rootLogin = (req, res) => {
  res.render(page.rootLogin.renderPath, page.rootLogin);
};

/** get - user */
const userEdit = (req, res) => {
  res.render(page.userEdit.renderPath, page.userEdit);
};

const userEditPassword = (req, res) => {
  res.render(page.userEditPassword.renderPath, page.userEditPassword);
};

const userRemove = (req, res) => {
  res.render(page.userRemove.renderPath, page.userRemove);
};

const userLogout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const userWatch = (req, res) => {
  res.render(page.userWatch.renderPath, page.userWatch);
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
      user = await UserModel.create({
        username: userData.name || userData.login,
        email: emailObj.email,
        password: '',
        name: userData.login,
        location: userData.location,
        socialOnly: true,
        avatarUrl: userData.avatar_url,
      });
      console.log(userData);
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
    return res.status(400).render(page.rootJoin.renderPath, Object.assign({}, page.rootJoin, { errorMessage: 'Password confirmation does not match.' }));
  }
  const exists = await UserModel.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render(page.rootJoin.renderPath, Object.assign({}, page.rootJoin, { errorMessage: 'This username/email is already taken.' }));
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
    return res.render(page.rootJoin.renderPath, Object.assign({}, ...page.rootJoin, { errMessage: error._message }));
  }
};

const postRootLogin = async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name, socialOnly: false });
  if (!user) {
    return res.status(400).render(page.rootLogin.renderPath, Object.assign({}, page.rootLogin, { errorMessage: 'This name does not exists.' }));
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render(page.rootLogin.renderPath, Object.assign({}, page.rootLogin, { errorMessage: 'Wrong password' }));
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

/** POST - user */
const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, username: sessionUsername, email: sessionEmail },
    },
    body: { username, email, name, location },
  } = req;

  const usernameExists = username != sessionUsername ? await UserModel.exists({ username }) : undefined;
  const emailExists = email != sessionEmail ? await UserModel.exists({ email }) : undefined;
  if (usernameExists || emailExists) {
    return res
      .status(400)
      .render(
        page.userEdit.renderPath,
        Object.assign(
          {},
          ...page.userEdit.pageTitle,
          { usernameErrorMessage: usernameExists ? 'This username is already taken' : 0 },
          { emailErrorMessage: emailExists ? 'This email is already taken' : 0 }
        )
      );
  }

  const updatedUser = await UserModel.findOneAndUpdate(_id, { username, email, name, location }, { new: true });

  req.session.user = updatedUser;
  return res.redirect('/user/edit');
};

const postUserEditPassword = async (req, res) => {
  res.render(page.userEditPassword.renderPath, page.userEditPassword);
};

export {
  rootJoin,
  rootLogin,
  userEdit,
  userEditPassword,
  userRemove,
  userLogout,
  userWatch,
  startGithubLogin,
  finishGithubLogin,
  postRootJoin,
  postRootLogin,
  postUserEdit,
  postUserEditPassword,
};
