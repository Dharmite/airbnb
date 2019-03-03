const express = require("express"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      expressSession = require("express-session"),
      general = require("./routes/generalPages"),
      home = require("./routes/home"),
      location = require("./routes/location"),
      auth = require("./routes/auth");

// Load location model
const Location = require("./models/Location");

// Load home model
const Home = require("./models/Home");

// Load User model
const User = require("./models/User");
mongoose.Promise = global.Promise;

const app = express();

// app.use(express.static(path.resolve("public")));
app.use(express.static("public"));

app.set("view engine", "ejs");

const port = process.env.PORT || 5000;

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbURL = process.env.MONGODB_URI || "mongodb://localhost/airbnbV12";

// Connect to MongoDB
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/*  Location.create({
  name: "rome",
  houses: []

})
  .then(house => console.log(house))
  .catch(err => console.log(err)); */

app.use(
  expressSession({

    secret: "My secret message that should be long and memorable",
    resave: false,
    saveUninitialized: false
  })
);

// conectar express com passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Use Routes
app.use(general);
app.use(home);
app.use(location);
app.use(auth);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
