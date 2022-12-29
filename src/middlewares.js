import multer from 'multer';

const localsMiddleware = (req, res, next) => {
  // console.log(req.session);
  res.locals.siteName = 'Wetube';
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user || {};
  // console.log(res.locals);
  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect('/login');
  }
};

const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect('/');
  }
};

const avatarUploadMiddleware = multer({ dest: 'uploads/avatars/', limits: { fileSize: 1048576 } });

const videoUploadMiddleware = multer({ dest: 'uploads/video/', limits: { fileSize: 10485760 } });

export {
  localsMiddleware,
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUploadMiddleware,
  videoUploadMiddleware,
};
