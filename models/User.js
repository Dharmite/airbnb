const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");


// Create Schema
const UserSchema = new Schema({

    username: {
        type: "String",
        required: true
    },
    password: {
        type: "String"
    }

});
UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('users', UserSchema);