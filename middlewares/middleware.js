const userModel = require("../models/userModel")
const gameModel = require("../models/gameModel")

const functions = {
    validateReg   : async function(req, res, next){
        let {username, password, email} = req.body
        let userExists = await userModel.findOne({
            username: username
        })

        if(userExists){
            res.status(401).send({msg: "User already exists"})
        }
        if(!(username)){
            res.status(401).send({msg: "Please enter a username"})
        }
        if(!(password)){
            res.status(401).send({msg: "Please enter a password"})
        }
        if(!(email)){
            res.status(401).send({msg: "Please enter a password"})
        }
        return next()
    },

    validateUser    : async function(req, res, next){
        let {username, password} = req.body

        let userExists = await userModel.findOne({
            username:username
        })
        if(userExists){
            if(userExists.password === password){
                return next()
            }
        }
        res.status(401).send({msg: "Incorrect Credentials"})
    }
}

module.exports = functions;