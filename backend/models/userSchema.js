const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hashed_passowrd: {type: String, required: true}
})

module.exports = mongoose.model("User", userSchema)