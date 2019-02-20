const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const general = require('./routes/generalPages');
const home = require('./routes/home');
const location = require('./routes/location');


const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.resolve("./public")));

const port = process.env.PORT || 5000;

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load location model
const Location = require("./models/Location");
// Load home model
const Home = require("./models/Home");

var dbURL = process.env.MONGODB_URI || "mongodb://localhost/airbnbV7";

// Connect to MongoDB
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//   Location.create({
//   name: "rome",
//   houses: []

// })
//   .then(house => console.log(house))
//   .catch(err => console.log(err));

// Use Routes
app.use(general);
app.use(home);
app.use(location);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
