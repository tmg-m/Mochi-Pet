const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  }
  return res.redirect('/');
};

module.exports = {
  isLoggedIn,
};
