const userModel = require("../models/userModel")
const gameModel = require("../models/gameModel")
const bcrypt = require('bcrypt')

const functions = {
    validateReg   : async function(req, res, next){
        let {username} = req.body
        let userExists = await userModel.findOne({
            username: username
        })

        if(userExists){
            res.status(401).send({msg: "User already exists"})
        }
        else
            return next()
    },

    validateUser    : async function(req, res, next){
        let {username, password} = req.body
        
        let userExists = await userModel.findOne({
            username:username
        })
        if(userExists){
            let comp = await bcrypt.compare(password, userExists.password)
            if(comp){
                return next()
            }
        }
        res.status(401).send({msg: "Incorrect Credentials"})
    },

    validateGame    : async function(req, res, next){
        var gameName = new RegExp('^' + req.body.gameName + '$', 'i');
        let name = req.body.gameName
        gameModel.aggregate([{$match: {name:gameName}}], function(err, data){
            if(err) console.log(err)
            else if(data.length > 0){
               res.status(401).send({msg: name + " already exists"}); 
            }else return next()
        })
    }
}

module.exports = functions;