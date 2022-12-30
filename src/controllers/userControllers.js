import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';

import UserModel from '../models/User';
import VideoModel from '../models/Video';
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
  if (req.session.user.socialOnly === true) {
    return res.redirect('/');
  }
  return res.render(page.userEditPassword.renderPath, page.userEditPassword);
};

const userRemove = (req, res) => {
  const { id } = req.params;
  res.render(page.userRemove.renderPath, page.userRemove);
};

const userLogout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const userProfile = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).populate('videos');
  console.log(
    Object.assign({}, page.userProfile, { pageTitle: `${user.name}님의 Profile` }, { user })
  );
  if (!user) {
    res.status(404).render(page.error404.renderPath, Object.assign({}, page.error404));
  }
  res.render(
    page.userProfile.renderPath,
    Object.assign({}, page.userProfile, { pageTitle: `${user.name}님의 Profile` }, { user })
  );
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
        userid: userData.login,
        email: emailObj.email,
        password: '',
        name: userData.name || userData.login,
        location: userData.location,
        socialOnly: true,
        avatarUrl: userData.avatar_url,
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
  const { userid, email, name, password, password2, location } = req.body;
  if (password !== password2) {
    return res
      .status(400)
      .render(
        page.rootJoin.renderPath,
        Object.assign({}, page.rootJoin, { errorMessage: '비밀번호가 일치하지 않습니다.' })
      );
  }
  const exists = await UserModel.exists({ $or: [{ userid }, { email }] });
  if (exists) {
    return res
      .status(400)
      .render(
        page.rootJoin.renderPath,
        Object.assign({}, page.rootJoin, { errorMessage: '이미 사용중인 아이디/이메일 입니다.' })
      );
  }

  try {
    await UserModel.create({
      userid,
      email,
      name,
      password,
      location,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.render(
      page.rootJoin.renderPath,
      Object.assign({}, ...page.rootJoin, { errMessage: error._message })
    );
  }
};

const postRootLogin = async (req, res) => {
  const { userid, password } = req.body;
  const user = await UserModel.findOne({ userid, socialOnly: false });
  if (!user) {
    return res
      .status(400)
      .render(
        page.rootLogin.renderPath,
        Object.assign({}, page.rootLogin, { errorMessage: '아이디가 존재하지 않습니다.' })
      );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(400)
      .render(
        page.rootLogin.renderPath,
        Object.assign({}, page.rootLogin, { errorMessage: '비밀번호가 일치하지 않습니다.' })
      );
  }

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

/** POST - user */
const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, userid: sessionUserid, email: sessionEmail, avatarUrl },
    },
    body: { userid, email, name, location },
    file,
  } = req;

  console.log(file);

  const useridExists = userid != sessionUserid ? await UserModel.exists({ userid }) : undefined;
  const emailExists = email != sessionEmail ? await UserModel.exists({ email }) : undefined;
  if (useridExists || emailExists) {
    return res
      .status(400)
      .render(
        page.userEdit.renderPath,
        Object.assign(
          {},
          page.userEdit.pageTitle,
          { useridErrorMessage: useridExists ? '변경하고자 하는 아이디는 이미 사용중입니다.' : 0 },
          { emailErrorMessage: emailExists ? '변경하고자 하는 이메일은 이미 사용중입니다.' : 0 }
        )
      );
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    _id,
    { userid, email, name, location, avatarUrl: file ? file.path : avatarUrl },
    { new: true }
  );

  req.session.user = updatedUser;
  return res.redirect('/user/edit');
};

const postUserEditPassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await UserModel.findById(_id);
  const ok = await bcrypt.compare(oldPassword, password);

  if (!ok) {
    return res.status(400).render(
      page.userEditPassword.renderPath,
      Object.assign({}, page.userEditPassword, {
        errorMessage: '기존 비밀번호가 일치하지 않습니다.',
      })
    );
  }

  if (newPassword !== newPassword2) {
    return res.status(400).render(
      page.userEditPassword.renderPath,
      Object.assign({}, page.userEditPassword, {
        errorMessage: '새로운 비밀번호가 일치하지 않습니다.',
      })
    );
  }

  user.password = newPassword;
  await user.save();
  return res.redirect('/user/logout');
};

export {
  rootJoin,
  rootLogin,
  userEdit,
  userEditPassword,
  userRemove,
  userLogout,
  userProfile,
  startGithubLogin,
  finishGithubLogin,
  postRootJoin,
  postRootLogin,
  postUserEdit,
  postUserEditPassword,
};
