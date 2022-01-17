const isLoggedIn = async (req, res, next) => {
  if (!req.session.currentUser) {
    return res.render('index.hbs');
  }
  next();
};

module.exports = {
  isLoggedIn,
};
