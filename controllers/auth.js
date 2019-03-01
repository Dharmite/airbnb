const User = require("../models/User");

exports.register = (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(401).send(err.message);
      } else {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            return res.status(401).send(err);
          }
          res.redirect("/profile");
        });
      }
    }
  );
};

exports.showProfile = (req, res) => {
  res.render("profile");
};

exports.login = (req, res) => {
  res.send("Logged in");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
