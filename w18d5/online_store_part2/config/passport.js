const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { JWT_SECRET } = require("./keys");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (token, done) => {
      if (token) {
        const user = await User.findById(token._id);
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
