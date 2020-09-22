const mongoose = require("mongoose")
const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("express-handlebars")
const cookie = require("cookie-parser")
const session = require("express-session")

// const userModel = require('./models/userModel')
// const gameModel = require('./models/gameModel')

const app = express()
app.use(cookie())
app.use(session({
    secret:"awjidioajodhau12312",
    name:"cookie",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge: 1000*60*60*24*30, httpOnly: false}
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

const router = require('./router/router');
app.use('/', router);

app.listen(3000, function(){
    console.log("I love you 3000")
})