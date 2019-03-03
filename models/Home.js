const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const HomeSchema = new Schema({
  host: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number
  },
  main_image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "locations"
  }
});

module.exports = Home = mongoose.model("homes", HomeSchema);
