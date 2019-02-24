// Load User model
const User = require("../models/User");

exports.register = (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      console.log(err);
      console.log(user);

      if (err) {
        // console.log(err);
        res.status(401).send(err.message);
      } else {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            return res.send("erro!");
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
