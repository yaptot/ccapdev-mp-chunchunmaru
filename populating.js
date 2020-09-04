const mongoose = require("mongoose")
const userModel = require("./models/userModel")
const gameModel = require("./models/gameModel")

mongoose.connect('mongodb://localhost/Gamerist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected'), err => console.log(err));
const db = mongoose.connection

let doc = new gameModel({
    name:name,
    publisher:publisher,
    publish:publish,
    genre:genre,
    filename:filename,
    description:description,
    platforms:platforms
})
    
doc.save(function(error,name){