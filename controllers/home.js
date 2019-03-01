const Location = require("../models/Location");
const Home = require("../models/Home");

const db = require("../utilities/db/db");

exports.showHome = (req, res) => {
  let homeId = req.params.room_id;
  Home.findById(req.params.room_id)
    .populate("host")
    .then(room => {
      Location.findOne({ _id: room.location }).then(location => {
        res.render("home", { room, location, homeId });
      });
    })
    .catch(err => console.error(err));
};

exports.showPlusHome = (req, res) => {
  res.send("Welcome to plus homes page");
};

exports.showCreateHome = (req, res) => {
  const city = req.params.city;

  const rome = Location.find({ name: city })
    .then(rome => {
      res.render("new_home", { city, rome });
    })
    .catch(err => console.log(err));
};

exports.createHome = async (req, res) => {
  if (req.params.city.toUpperCase() !== "ROME") {
    res.render("notfound");
  }

  try {
    let location = await db.findDocumentByProperty("locations", {
      name: req.params.city
    });

    const newHome = await db.postToDB("homes", {
      host: req.user._id,
      name: req.body.name,
      beds: req.body.beds,
      price: req.body.price,
      main_image: req.body.main_image,
      description: req.body.description,
      location: location._id
    });

    location.houses.push(newHome._id);
    location
      .save()
      .then(result => res.redirect(`/${req.params.city}/homes`))
      .catch(err => res.json(err));
  } catch (error) {
    return error;
  }
};

exports.showEditPage = (req, res) => {
  res.render("edit_home", { homeId: req.params.room_id });
};

exports.editPage = (req, res) => {
  Home.findOneAndUpdate(req.params.room_id, {
    name: req.body.name,
    beds: req.body.beds,
    price: req.body.price,
    main_image: req.body.main_image,
    description: req.body.description
  }).then(house => {
    house
      .save()
      .then(savedHouse => {
        res.send("sucess");
      })
      .catch(err => res.json(err));
  });
};

exports.deletePage = (req, res) => {
  Home.findByIdAndRemove(req.params.room_id).then(result => {
    Location.findByIdAndUpdate(result.location, {
      $pull: { houses: result._id }
    }).then(location => {
      res.json(location);
    });
  });
};