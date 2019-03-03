const db = require("../utilities/db/db");

const showHome = async (req, res) => {
  try {
    let homeId = req.params.room_id;
    let room = await db.findDocumentByProperty(
      "homes",
      { _id: req.params.room_id },
      "host"
    );
    let location = await db.findDocumentByProperty("locations", {
      _id: room.location
    });
    res.render("home", { room, location, homeId });
  } catch (error) {
    return res.json(error);
  }
};

const showPlusHome = (req, res) => {
  res.send("Welcome to plus homes page");
};

const showCreateHome = async (req, res) => {
  try {
    const city = req.params.city;
    const rome = await db.findDocumentByProperty("locations", { name: city });
    res.render("new_home", { city, rome });
  } catch (error) {
    return res.json(error);
  }
};

const createHome = async (req, res) => {
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
    await location.save();
    res.redirect(`/${req.params.city}/homes`);
  } catch (error) {
    return error;
  }
};

const showEditPage = async (req, res) => {
  try {
    let room = await db.findDocumentByProperty(
      "homes",
      { _id: req.params.room_id },
      "host"
    );
    res.render("edit_home", { homeId: req.params.room_id, room });
  } catch (error) {
    return res.json(error);
  }
};

const editPage = async (req, res) => {
  try {
    let home = await db.updateDocumentByProperty(
      "homes",
      { _id: req.params.room_id },
      {
        name: req.body.name,
        beds: req.body.beds,
        price: req.body.price,
        main_image: req.body.main_image,
        description: req.body.description
      }
    );

    await home.save();
    res.send("sucess");
  } catch (error) {
    return res.json(error);
  }
};

const deleteHouse = async (req, res) => {
  try {
    let home = await db.deleteDocumentByProperty("homes", {
      _id: req.params.room_id
    });
    let location = await db.findDocumentByProperty("locations", {
      _id: home.location
    });

    await db.updateDocumentByProperty(
      "locations",
      { _id: location._id },
      { $pull: { houses: home._id } }
    );
    res.json(location);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  showHome: showHome,
  showPlusHome: showPlusHome,
  showCreateHome: showCreateHome,
  createHome: createHome,
  showEditPage: showEditPage,
  editPage: editPage,
  deleteHouse: deleteHouse
};
