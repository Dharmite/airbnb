const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  houses: [
    {
        type: Schema.Types.ObjectId,
        ref: "homes"
      
    }
  ]
});

module.exports = Location = mongoose.model("locations", LocationSchema);
