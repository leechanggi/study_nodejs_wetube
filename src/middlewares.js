const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Wetube';
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};

export { localsMiddleware };
