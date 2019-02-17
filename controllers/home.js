exports.showHome = (req, res) => {
  Home.findById(req.params.room_id)
    .then(room => {
      // como vou buscar city???
      res.render("home", { room, city: "rome" });
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

exports.createHome = (req, res) => {
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
            .then(rome => res.redirect(`/${req.params.city}/homes`))
            .catch(err => res.json(err));
        })
        .catch(err => console.error(err));
    })
    .catch(err => res.json(err));
};
