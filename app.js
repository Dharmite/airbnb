const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.resolve("./public")));

const port = process.env.PORT || 5000;

const rome = [
  {
    title: "Napoleone III Holiday home",
    price: 52,
    url:
      "https://a0.muscache.com/im/pictures/90922bce-4a86-4fdb-992c-c602b99f9c35.jpg?aki_policy=xx_large",
    stars: 5,
    description:
      "Il nostro alloggio, fornito di due comode e ampie camere da letto, zona pranzo con un grande tavolo per 4 persone, un divano e due poltrone per i momenti di relax davanti alla tv, cucina bagno balcone cucina e piccla zona lavanderia, è situato nel centro storico di Roma"
  },
  {
    title: "Giubbonari Exclusive Location x 4",
    price: 38,
    url:
      "https://a0.muscache.com/im/pictures/22154918/2345a54a_original.jpg?aki_policy=xx_large",
    stars: 4.5,
    description:
      "The apartment is located in the heart of the historical center of Roma: 'Campo di Fiori' Square, a rectangular square behind Piazza Navona, today best known for its daily lively market."
  },
  {
    title: "Pettinarihome Campo de FIORI",
    price: 89,
    url:
      "https://a0.muscache.com/im/pictures/11341171/d5ca49b5_original.jpg?aki_policy=xx_large",
    stars: 5,
    description:
      "Our apartment 'a suite of 25 sqm. a few steps from Campo de Fiori, Ponte Sisto, Piazza Trilussa, Piazza Navona is situated in a building of (Phone number hidden by Airbnb) , the third and last floor, very bright and quiet, the structure can 'hold n 2 persons, suite' was recently renovated and is' provided with every comfort"
  },
  {
    title: "Trevi Luxury Apartment",
    price: 45,
    url:
      "https://a0.muscache.com/im/pictures/d4dae5ba-a2ee-4141-b066-1c01d0e87bf4.jpg?aki_policy=xx_large",
    stars: 4.5,
    description:
      "Trevi Luxury apartment is located in the heart of Rome, in a very strategic areas for those who want to visit the city: literally in front of Trevi Fountain, 8 minutes from the Spanish Steps and 6 minutes from the Pantheon (URL HIDDEN). "
  }
];

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/s/:city/all", (req, res) => {
  const data = {
    where: req.params.city,
    indate: req.query.indate,
    outdate: req.query.outdate,
    hospedes: req.query.hospedes
  };

  

  res.render("search", { data, rome});
});

app.get("/s/:city/homes", (req, res) => {
  res.send("Welcome to home search results");
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
