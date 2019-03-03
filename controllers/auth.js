const User = require("../models/User");

const register = (req, res) => {
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
          res.json({msg:"success"});
        });
      }
    }
  );
};

const showProfile = (req, res) => {
  res.render("profile");
};

const login = (req, res) => {
  res.send("Logged in");
};

const logout = (req, res) => {

  req.logout();
  res.redirect("/");  
  
};


module.exports = {
  register: register,
  showProfile: showProfile,
  login: login,
  logout: logout
};
