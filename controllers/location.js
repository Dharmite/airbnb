const db = require("../utilities/db/db"),
  mongoose = require("mongoose");

const showAll = async (req, res) => {
  try {
    const city = req.params.city;
    let found = false;
    let searched_homes;
    let location = await db.findDocumentByProperty(
      "locations",
      { name: city },
      "houses"
    );
    if (location !== null) {
      searched_homes = location.houses;
      if (searched_homes.length === 0) {
        found = true;
      }
      res.render("search", { location: city, searched_homes, found });
    } else {
      res.render("notfound", { city });
    }
  } catch (error) {
    return res.json(error);
  }
};

const showHomes = async (req, res) => {
  try {
    const city = req.params.city;
    let found = false;
    let searched_homes;
    let location = await db.findDocumentByProperty(
      "locations",
      { name: city },
      "houses"
    );
    if (location !== null) {
      searched_homes = location.houses;
      if (searched_homes.length === 0) {
        found = true;
      }
      res.render("homes", { location: city, searched_homes, found });
    } else {
      res.render("notfound", { city });
    }
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  showAll: showAll,
  showHomes: showHomes
};
