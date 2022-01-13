const updateIfUser = (req, res, next) => {
  if (req.session.currentUser.id) {
    return next();
  }
  return res.redirect('/');
};

module.exports = {
  isLoggedIn,
};
