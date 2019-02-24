const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");

const general = require("./routes/generalPages");
const home = require("./routes/home");
const location = require("./routes/location");
const auth = require("./routes/auth");

const app = express();
// app.use(express.static(path.resolve("public")));
app.use(express.static("public"));

app.set("view engine", "ejs");

const port = process.env.PORT || 5000;

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load location model
const Location = require("./models/Location");

// Load home model
const Home = require("./models/Home");

// Load User model
const User = require("./models/User");

var dbURL = process.env.MONGODB_URI || "mongodb://localhost/airbnbV12";

// Connect to MongoDB
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//  Location.create({
//   name: "rome",
//   houses: []

// })
//   .then(house => console.log(house))
//   .catch(err => console.log(err));


app.use(
  expressSession({
    /*
  What is the secret?
  source: https://stackoverflow.com/questions/5343131/what-is-the-sessions-secret-option

  It it used to compute the hash of the session
  */
    secret: "My secret message that should be long and memorable",
    /*
  Resave e saveUninitialized, explicação:

  https://stackoverflow.com/questions/40381401/when-use-saveuninitialized-and-resave-in-express-session
  */
    resave: false,
    saveUninitialized: false
  })
);

// conectar express com passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// São funções que adicionamos ao passport para ele poder extrair e inserir informação na sessão do User, de forma a poder converter num certo formato
// Para mais info: source: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
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
