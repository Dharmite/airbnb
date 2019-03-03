const Location = require("../models/Location");
const Home = require("../models/Home");

const db = require("../utilities/db/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.showAll = async (req, res) => {
  const city = req.params.city;
  let searched_homes;

  if (city.toUpperCase() === "ROME") {
    try {
      let location = await db.findDocumentByProperty(
        "locations",
        { name: city },
        "houses"
      );
      searched_homes = location.houses;
      res.render("search", { location: city, searched_homes });
    } catch (error) {
      return error;
    }
  } else {
    res.render("notfound", { city });
  }
};

exports.showHomes = async (req, res) => {
  const city = req.params.city;

  if (city.toUpperCase() === "ROME") {
    try {
      let searched_homes;
      let location = await db.findDocumentByProperty(
        "locations",
        { name: city },
        "houses"
      );
      searched_homes = location.houses;
      res.render("homes", { city, searched_homes });
    } catch (error) {
      return error;
    }
  } else {
    res.render("notfound", { city });
  }
};
