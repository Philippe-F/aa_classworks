
const passportAuthenticate = passport => (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  passportAuthenticate
};
