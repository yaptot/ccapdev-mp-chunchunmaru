const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    name:String,
    publisher:String,
    publish:Date,
    genre:[String],
    filename:String,
    description:String,
    platforms:[String]
})

module.exports = mongoose.model('games', gameSchema)