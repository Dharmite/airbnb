const express = require("express");
const path = require("path");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

Location.create({
  name: "rome",
  houses: []

})
  .then(house => console.log(house))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  const data = {
    where: req.query.city,
    indate: req.query.indate,
    outdate: req.query.outdate,
    hospedes: req.query.hospedes
  };

  res.render("homepage", { data });
});

app.get("/s/:city/all", (req, res) => {
  const city = req.params.city;
  let searched_homes;
  if (city.toUpperCase() === "ROME") {
    Location.findOne({ name: city })
      .populate("houses")
      .exec(function(err, location) {
        searched_homes = location.houses;
        res.render("search", { city, searched_homes });
      });
  } else {
    res.render("notfound", { city });
  }
});

app.get("/:city/homes", (req, res) => {
  const city = req.params.city;
  let searched_homes;
  if (city.toUpperCase() === "ROME") {
    Location.findOne({ name: city })
      .populate("houses")
      .exec(function(err, location) {
        searched_homes = location.houses;
        res.render("homes", { city, searched_homes });
      });
  } else {
    res.render("notfound", { city });
  }
});

app.get("/rooms/:room_id", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/rooms/plus/:room_id", (req, res) => {
  res.send("Welcome to plus homes page");
});

app.get("/help", (req, res) => {
  res.send("Welcome to help page");
});

app.get("/s/:city/homes/new", (req, res) => {
  const city = req.params.city;

  const rome = Location.find({ name: city })
    .then(rome => {
      res.render("new_home", { city, rome });
    })
    .catch(err => console.log(err));
});

app.post("/:city/homes", (req, res) => {
  if (req.params.city.toUpperCase() !== "ROME") {
    res.render("notfound");
  }

  Location.findOne({ name: req.params.city })
    .then(location => {
      const newHome = {
        name: req.body.name,
        beds: req.body.beds,
        price: req.body.price,
        main_image: req.body.main_image,
        description: req.body.description
      };

      Home.create(newHome)
        .then(home => {
          location.houses.push(home._id);
          location
            .save()
            .then(rome => console.log(rome))
            .catch(err => res.json(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => res.json(err));

  res.redirect(`/${req.params.city}/homes`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});