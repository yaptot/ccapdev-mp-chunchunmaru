const mongoose = require("mongoose")
const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("express-handlebars")
const cookie = require("cookie-parser")
const session = require("express-session")
const userModel = require("./models/userModel")
const gameModel = require("./models/gameModel")

const app = express()
app.use(cookie())
app.use(session({
    secret:"awjidioajodhau12312",
    name:"cookie",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60*24}
}))

app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())
app.use(express.static(__dirname + '/'));

app.engine('hbs', hbs.create({
    extname: 'hbs',
    helpers: {
        formatDate: function(string){
            let date = new Date(string)
            return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
        }
    },
    partialsDir:'views/partials'
}).engine);
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/Gamerist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected'), err => console.log(err));
const db = mongoose.connection

/*
    ROUTES
*/

app.get('/thanos', async (req, res) => {
    try {
        // var user = await userModel.findOne({username: 'yap'});
        // var games = await gameModel.updateMany({}, {$push: {review: {user: user, rating: 1, review: "game didn't even play"}}});
        // console.log(games);
        
        // var agg = await gameModel.find({}).populate('review.user');
        // agg.forEach(e => console.log(e.review))
        
        var users = await userModel.find({}).populate("gameList.game");
        var dbgames = await gameModel.find({});
        var ratings = [], ave = [];
        
        for (let i = 0; i < dbgames.length; i++) {
            ratings.push({game: dbgames[i].name, rating: 0, count: 0});
            for (let j = 0; j < users.length; j++) {
                let index = users[j].gameList.findIndex(e => e.game.name === dbgames[i].name && e.game.rating !== null);
                if (index !== -1) {
                    ratings[i].rating += users[j].gameList[index].rating;
                    ratings[i].count++;
                }
            }
            ave.push({game: dbgames[i].name, aveRating: ratings[i].rating/ratings[i].count});
        }
        
        ave.sort((a, b) => b.aveRating - a.aveRating);
        console.log(ave);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/');
});

app.get("/", async (req, res)=>{
    try {
        var users = await userModel.find({}).populate("gameList.game")
        var dbgames = await gameModel.find({})
        var ratings = [], ave = [];
        
        for (let i = 0; i < dbgames.length; i++) {
            ratings.push({game: dbgames[i].name, rating: 0, count: 0});
            for (let j = 0; j < users.length; j++) {
                let index = users[j].gameList.findIndex(e => e.game.name === dbgames[i].name && e.game.rating !== null);
                if (index !== -1) {
                    ratings[i].rating += users[j].gameList[index].rating;
                    ratings[i].count++;
                }
            }
            ave.push({game: dbgames[i].name, aveRating: ratings[i].rating/ratings[i].count});
        }
        
        ave.sort((a, b) => b.aveRating - a.aveRating);
        ave.limit(0, 4)
    } catch (e) {
        console.log(e);
    }
    res.render("index",{
        user:req.session.user,
        games:ave
    })
    // res.render("../views/tests/index",{
    //     users:JSON.parse(JSON.stringify(users)),
    //     games:JSON.parse(JSON.stringify(games))
    // })

    // let i = 0
    // let j = 0
    // //user.gameList.game
    // for(i=0;i<games.length;i++){
    //     for(j=0;j<users.length;j++){
    //         if(users.gameList[i].game === dbgames[j]){
    //             try{
    //                 console.log(users.)
    //                 ratings[j] = users.gameList[i].rating
    //             }catch(e){
    //                 console.log(e)
    //             }
    //         }
    //     }
    // }
    // console.log(rating)
    // res.redirect("/")

})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    let {username, password, email} = req.body
    let userExists = await userModel.findOne({
        username: username
    })
    let doc = new userModel({
        userType: "member",
        username: username,
        password: password,
        email: email,
        gameList: []
    })
    if (userExists) {
        res.status(403).send({msg: "User already exists!"})
    } else {
        doc.save(function (error) {
            if (error) {
                return console.error(error)
            } else {
                res.status(200).send({msg: "yehey"})
            }
        })
    }
})

app.get("/login", (req, res) => {
    res.render("login", {
    })
})

app.post("/login", async (req, res) => {
    let {username} = req.body
    let {password} = req.body
    if (username == "admin" && password == "caiperyap") {
        res.send("Suck a dick, admin")
    } else {
        let result = await userModel.findOne({
            username: username,
            password: password
        }).populate("gameList.game")
        if (result) {
            res.status(200).send({msg: "Log-in successful!"})
            req.session.user = result
            res.render("index", {
                isLogged: true,
                user: JSON.parse(JSON.stringify(username))
            })
        } else {
            res.status(403).send({msg: "Incorrect username/password!"})
        }
    }
})

app.get("/myList", async (req, res)=>{
    let user = await userModel.findOne({username:req.session.user.username}).populate("gameList.game")
    user = JSON.parse(JSON.stringify(user))
    req.session.user = user

    let playing = user.gameList.filter(e => e.status === "Playing")
    let completed = user.gameList.filter(e => e.status === "Completed")
    let planning = user.gameList.filter(e => e.status === "Planning")
    let dropped = user.gameList.filter(e => e.status === "Dropped")

    console.log(user)
    res.render("myList",{
        user:user,
        playing:playing,
        completed:completed,
        planning:planning,
        dropped:dropped
    })
})

app.get("/browse",async (req, res)=>{
    let games = await gameModel.find({})
    games = JSON.parse(JSON.stringify(games))
    res.render("browse", {
        user:req.session.user,
        games:games
    })
})

app.get("/search",function(req,res){
    let search = new RegExp (req.query.search,'gi')
    gameModel.aggregate([{$match: {name: search}}], function (err, data) {
        res.render("index.hbs", {
            error_search: data.length == 0 ? true : false,
            searchname: JSON.parse(JSON.stringify(data))
        })
    })
})

app.post("/addgame",function(req,res){

    let name = req.body.name
    let publisher = req.body.publisher
    let publish= req.body.publish
    let genre= req.body.genre.split(',')
    let filename= req.body.filename
    let description=req.body.description
    let platforms=req.body.platforms.split(',')

    publish = new Date(publish)

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
        
        if(error){
            return console.error(error)
        }
        else{
            res.redirect("/")
            console.log(name+"Added")
        }
    })

})

app.post("/addList",async function(req, res){
    let game = req.body.game
    let status = req.body.status

    let user = {username:req.session.user.username}
    let dbGame = await gameModel.findOne({name:game})

    userModel.findOneAndUpdate(user, {$push: {gameList: {game: dbGame, status: status, rating:null, review:null}}}, {useFindAndModify: false},async function(err){
        if(err){
           console.log(err) 
        }
        else{
            req.session.user = await userModel.findOne({username:user.username})
            res.render("index.hbs",{
                user:req.session.user
            })
        }
    })
})

app.get("/getList",async function(req, res){ //req.session.user.username
    let user = req.session.user
    console.log(user)
    res.render("../views/tests/list.hbs",{
        user:user
    })
})

app.get("/viewProfile", function(req, res){
    let user = req.session.user
    res.render("../views/tests/profile.hbs", {
        user:user
    })
})

app.post("/deleteGame",async function(req, res){
    let user = req.session.user
    let game = req.body.gameName

    let dbgame = await gameModel.findOne({name:game})
    console.log(dbgame)
    await userModel.findOneAndUpdate(user, {$pull: {gameList: {game:dbgame}}},{useFindAndModify: false},async function(err){
        if(err) console.log(err)
        else{
            user = await userModel.findOne({username:user.username})
            req.session.user = user
            console.log("userFound:"+req.session.user)
            res.render("index.hbs", {
                user:req.session.user
            })
        }
    })
})

app.post("/updateStatus", async function(req, res) {
    let {gameName, status} = req.body

    var user = await userModel
            .findOne({username: req.session.user.username})
            .populate('gameList.game')
    if (user) {
        console.log(user)
        user.gameList.forEach(e => {
            if (e.game.name === gameName) e.status = status;
        })
        await user.save()
        res.render("index.hbs",{
            user:user
        })
    }
})

app.get("/viewGame",async  function(req,res){
    let game = req.body.game
    let dbgame = await gameModel.findOne({name:game})

    res.render("gamePage",{
        user:req.session.user,
        game:dbgame
    })
})

app.listen(3000, function(){
    console.log("listening to 3000")
})