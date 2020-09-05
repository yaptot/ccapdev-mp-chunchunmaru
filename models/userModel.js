const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userType:String,
    username:String,
    password:String,
    email:String,
    gameList:[{game:{type: mongoose.Schema.Types.ObjectId, ref: 'games'}, status:String, rating:Number, review:String}]
})

module.exports= mongoose.model('users', userSchema)