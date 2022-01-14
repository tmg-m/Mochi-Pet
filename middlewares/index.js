const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  }
  return res.render('index.hbs');
};

module.exports = {
  isLoggedIn,
};