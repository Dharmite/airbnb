// Load location model
const Location = require("../models/Location");
// Load home model
const Home = require("../models/Home");

const db = require("../utilities/db/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.showAll = (req, res) => {
  const city = req.params.city;
  let searched_homes;
  if (city.toUpperCase() === "ROME") {
    Location.findOne({ name: city })
      .populate("houses")
      .exec(function(err, location) {
        searched_homes = location.houses;
        res.render("search", { location: city, searched_homes });
      });
  } else {
    res.render("notfound", { city });
  }
};

exports.showHomes = async (req, res) => {
  const city = req.params.city;

  if (city.toUpperCase() === "ROME") {
    let searched_homes;
  
    Location.findOne({name:city}).populate("houses")
      .exec(function(err, location) {
        if(err){
          return console.error(err);
        }
        searched_homes = location.houses;
        res.render("homes", { city, searched_homes });
      })
  } else {
    res.render("notfound", { city });
  }
};
