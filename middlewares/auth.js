const Home = require("../models/Home");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("You have to login to access this page");
};

exports.isHomeHost = (req, res, next) => {
  Home.findById({ _id: req.params.room_id }).then(home => {
    if (home.host._id.equals(req.user._id)) {
      return next();
    } else {
      res.send("not authorized");
    }
  });
};
