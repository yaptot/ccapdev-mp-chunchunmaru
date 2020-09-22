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

/*
    ROUTES
*/

app.get("/populate",async e =>{
    await gameModel.insertMany([{
        name:"VALORANT",
        publisher:"Riot",
        publish:new Date("2020-05-20"),
        genre:["ACTION", "FPS"],
        filename:"../assets/img/sample/Valorant.jpg",
        description:"Valorant is a team-based tactical shooter and first-person shooter set in the near-future. Players play as one of a set of agents, characters designed based on several countries and cultures around the world. Valorant is a team-based tactical shooter and first-person shooter set in the near-future. Players play as one of a set of agents, characters designed based on several countries and cultures around the world. In the main game mode, players are assigned to either the attacking or defending team with each team having five players on it. Agents have unique abilities each requiring charges, as well as a unique ultimate ability which requires charging through kills, deaths, or spike actions. Each player starts each round with a classic pistol and with one or more signature ability charge. Other weapons and ability charges can be purchased using an in game economic system which awards money based on the outcome of the previous round, any kills the player is responsible for, and any actions taken with the spike. The game has an assortment of weapons including sidearms, submachine guns, shotguns, machine guns, assault rifles and sniper rifles. Automatic and semi-automatic weapons such as the Spectre, Odin, and Vandal have recoil patterns which have to be controlled by the player in order to be able to shoot accurately. ",
        platforms:["PC"]
    },{
        name:"Warframe",
        publisher:"Digital Extremes",
        publish:new Date("2005-04-25"),
        genre:["ACTION", "ADVENTURE", "SCI-FI"],
        filename:"../assets/img/sample/Warframe.png",
        description:"Warframe is an online action game that includes elements of shooters, RPG, and stealth games. The player creates their Tenno character, which includes a basic armor unit called a Warframe which provides the player with special abilities, basic weapons such as a melee weapon, primary, sidearm(s), and a ship. In Warframe, players control members of the Tenno, a race of ancient warriors who have awoken from centuries of suspended animation far into Earth's future to find themselves at war in the planetary system with different factions. The Tenno use their powered Warframes along with a variety of weapons and abilities to complete missions. While many of the game's missions use procedurally-generated levels, newer updates have included large open world areas similar to other massively multiplayer online games as well as some story-specific missions with fixed level design. The game includes elements of shooting and melee games, parkour, and role-playing to allow players to advance their Tenno with improved gear. The game includes both player versus environment and player versus player elements. It is supported by microtransactions, which lets players purchase in-game items using real money, but also offers the option to earn them at no cost through grinding. The concepts for Warframe originated in 2000, when Digital Extremes began work on a new game titled Dark Sector. At the time, the company had been successful in supporting other developers and publishers, and wanted to develop their own game in-house. The game suffered several delays and was eventually released in 2008, having used some of the initial framework but far different from the original plan. By 2012, in the wake of the success of free-to-play games, the developers took their earlier Dark Sector ideas and art assets and incorporated them into a new project, their self-published Warframe. Initially, the growth of Warframe was slow, hindered by moderate critical reviews and low player counts. Since its release, the game has experienced positive growth. The game is one of Digital Extremes' most successful titles, seeing nearly 50 million players in 2019.",
        platforms:["PC"]
    },{
        name:"Remnant:From the Ashes",
        publisher:"Perfect World Entertainment",
        publish:new Date("2019-08-20"),
        genre:["ACTION", "ADVENTURE", "RPG", "CO-OP", "SOULS-LIKE"],
        filename:"../assets/img/sample/Remnant.jpg",
        description:"The world has been thrown into chaos by an ancient evil from another dimension. As one of the last remnants of humanity, you must set out alone or alongside up to two other survivors to face down hordes of deadly enemies to try to carve a foothold, rebuild, and retake what was lost. Remnant: From the Ashes borrows its mechanics from franchises such as the Souls series, but rather than simply being melee combat, it incorporates a third person shooter element where the player can wield up to two gun weapons, one main weapon and one side arm, alongside their melee weapon. These weapons can vary between machine guns, shotguns, hunting rifles, sniper rifles and the like, and can also attach mods to them which give players extra abilities. Players can create their own custom character, and are required to defeat challenging enemies and bosses found throughout a randomly generated world, though the player still follows a set story. Players are able to upgrade their weapons and armor using materials they find throughout the world. They can also unlock trait points, which can be used to increase the stats of their playable character. Unlike other Souls titles which have limited multiplayer components, Remnant allows players to team up with up to three other players and progress through the story, where the game scales the difficulty based on how many players are in the game. The way this works is that if a player joins another players game, while the joining player will earn the same loot as the original player, once the joining player returns back to their world, they are required to progress through the story again. This is because different elements found in one players world may not be the same in another players; this can vary to which enemies and which bosses a player encounters. Unlike other similar titles, players do not lose any items or skill points upon death, but are taken back to the checkpoint, where each time the enemies may differ in number or change what spawns, thus keeping a variety in gameplay.",
        platforms:["PC"]
    },{
        name:"Bakugan: Defenders of the Core",
        publisher:"JP:Sega",
        publish:new Date("2010-10-26"),
        genre:["ACTION", "ADVENTURE", "SCI-FI"],
        filename:"../assets/img/sample/Bakugan.jpg",
        description:"The game follows a separate story arc from the anime, in which the Resistance must protect Earth from a furious assault by the Vexos who are slowly taking over in order to destroy all of the Resistance's havens and Drago who contains the Perfect Core that the Vexos are searching for. The game follows a separate story arc from the anime, in which the Resistance must protect Earth from a furious assault by the Vexos who are slowly taking over in order to destroy all of the Resistance's havens and Drago who contains the Perfect Core that the Vexos are searching for. Bakugan: Defenders of the Core brings gamers into a fast binding action adventure to save the Earth from Zenoheld, Spectra, and their Vexos minions. Players create a new hero and discover new aspects of Bakugan by having full control over the creatures when taking on the opponents. For fans who get the DS version, they will take advantage of the dual screens. The game has split-screen multiplayer, head to head battles, and free for all. There is also a Collector's Edition that comes with a figure of a Bakugan. There is a large variety of figures, including a Pyrus Neo Dragonoid, Subterra Centipoid, Aquos Limulus, Subterra Cycloid, Subterra Hammer Gorem, Haos Blade Tigrerra, Darkus Laserman, Ventus Ingram, Ventus El Condor, Aquos Preyas Angelo, Aquos Preyas Diablo, and many more.",
        platforms:["PSP","Wii"]
    },{
        name:"Fate/stay night",
        publisher:"TYPE-MOON",
        publish:new Date("2004-01-30"),
        genre:["VISUAL NOVEL", "FANTASY",],
        filename:"../assets/img/sample/FateStayNight.jpg",
        description:"Fate/stay night's gameplay requires little interaction from the player as most of the game's duration is spent on reading the text that appears, representing either dialogue between the characters, narration, or the inner thoughts of the protagonist. Often, players will come to a decision point where they are given the chance to choose from options displayed on the screen, typically two to three at a time. The time between these decision points is variable and during these times, gameplay pauses until a choice is made that furthers the plot in a specific direction. There are three main plot lines that the player will have the chance to experience, one for each of the heroines in the story. To view all three plot lines, the player will have to replay the game multiple times and choose different choices during the decision points to progress the plot in an alternate direction. When interacting with the heroines with the routes, an affection meter is created which is raised by giving them an answer that pleases them. Depending on the affection the player has achieved, a True Ending can be unlocked.",
        platforms:["PC"]
    },{
        name:"Euro Truck Simulator 2",
        publisher:"SCS Software",
        publish:new Date("2012-10-19"),
        genre:["VEHICLE SIMULATION"],
        filename:"../assets/img/sample/ETS2.jpg",
        description:"Euro Truck Simulator 2 is a truck simulator game developed and published by SCS Software for Microsoft Windows, Linux, and macOS and was initially released as open development on 19 October 2012. The game is a direct sequel to the 2008 game Euro Truck Simulator and it is the second video game in the Truck Simulator series. The basic premise of the game is that the player can drive one of a choice of articulated trucks across a condensed depiction of Europe, picking up cargo from various locations and delivering it. As the game progresses, it is possible for the player to buy more vehicles and depots, as well as hire other drivers to work for them.",
        platforms:["PC"]
    },{
        name:"Fall Guys",
        publisher:"Devolver Digital",
        publish:new Date("2020-08-04"),
        genre:["BATTLE ROYALE", "PLATFORMER" ],
        filename:"../assets/img/sample/fallGuys.jpg",
        description:"Fall Guys: Ultimate Knockout is a 2020 platformer battle royale game developed by Mediatonic and published by Devolver Digital. It was announced at E3 in June 2019 and released on 4 August 2020 for Microsoft Windows and PlayStation 4. The game draws inspiration from game shows like Takeshi's Castle, It's a Knockout and Total Wipeout, and children's playground games like tag and British bulldog. Up to 60 players compete in matches with battle royale-style gameplay.Players, represented as jellybean-like figures, move around a three-dimensional playing field, with additional moves such as jumping, grabbing, or diving to assist gameplay. The aim is to qualify for subsequent rounds by successfully completing each of the randomly selected mini-games. Certain mini-games involve running towards a finish line at the end of the map, while others add elements of teamwork. On every mini-game, obstacles appear around the map for added complexity. Players who are too slow or who fail certain requirements for a mini-game are eliminated. On the final round, the remaining few players compete in a final match with a randomised mini-game designed for a smaller player size. The winner of the match is the last player standing. Using an in-game currency, Kudos, players can purchase cosmetics and emotes for their character to show off in game. Players obtain Kudos by completing matches and get Crowns (the premium currency) by winning. Some of the costumes are of characters from different games, such as Gordon Freeman from the Half-Life series or Jacket from Hotline Miami. The game supports microtransactions for the purchase of additional in-game currency.",
        platforms:["PC", "PS4"]
    },{
        name:"Dark Souls",
        publisher:"From Software",
        publish:new Date("2011-09-22"),
        genre:["ACTION", "ADVENTURE", "RPG", "MULTIPLAYER"],
        filename:"../assets/img/sample/DarkSouls.jpg",
        description:"Dark Souls is a 2011 action role-playing game developed by FromSoftware and published by Namco Bandai Games. A spiritual successor to FromSoftware's Demon's Souls, the game is the second instalment in the Souls series. Dark Souls takes place in the fictional kingdom of Lordran, where players assume the role of a cursed undead character who begins a pilgrimage to discover the fate of their kind. A port for Microsoft Windows was released in August 2012, which featured additional content not seen in the original PlayStation 3 and Xbox 360 versions. In October 2012, the new content was made downloadable for consoles under the subtitle Artorias of the Abyss. Dark Souls has been cited as one of the greatest video games of all time. Critics praised the depth of its combat, intricate level design, and use of flavor text. However, the game's difficulty received more mixed reviews, with some criticizing it for being too unforgiving. The original Windows version of the game was less well-received, with criticism directed at several technical issues. By April 2013, the game had sold over two million copies worldwide. The game saw two sequels released in the mid-2010s, while a remastered version was released in 2018.",
        platforms:["PC", "PS4"]
    },{
        name:"Dark Souls 2",
        publisher:"From Software",
        publish:new Date("2014-11-03"),
        genre:["ACTION", "ADVENTURE", "RPG", "MULTIPLAYER"],
        filename:"../assets/img/sample/DarkSouls2.jpg",
        description:"Dark Souls II is an action role-playing game developed by FromSoftware and published by Bandai Namco Games. The third game in the Souls series, it was released for Microsoft Windows, PlayStation 3 and Xbox 360. Although both are set in the same universe, there is no overt story connection between the first Dark Souls and the sequel.[4] The game uses dedicated multiplayer servers.[4] Taking place in the kingdom of Drangleic, the game features both player versus environment (PvE) and player versus player (PvP) gameplay, in addition to having some co-op components. As in the earlier games in the series, it again features challenging gameplay, but with a more powerful graphics engine and more advanced artificial intelligence system. After some initial delays, the game was released worldwide in March 2014, with the Microsoft Windows version being released on April 24, 2014.[3][5] The game received both critical acclaim, and high sales. An updated version of the game, subtitled Scholar of the First Sin, was released for PlayStation 3, PlayStation 4, Xbox 360, Xbox One and Microsoft Windows in April 2015. The title is a compilation of the original game and all of its downloadable content with upgraded graphics, expanded online multiplayer capacity, and various other changes. A sequel, Dark Souls III, was released in 2016.",
        platforms:["PC", "PS4", "XBOX"]
    },{
        name:"Dark Souls 3",
        publisher:"From Software",
        publish:new Date("2016-03-24"),
        genre:["ACTION", "ADVENTURE", "RPG", "MULTIPLAYER"],
        filename:"../assets/img/sample/DarkSouls3.jpg",
        description:"Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment for PlayStation 4, Xbox One, and Microsoft Windows. The fourth installment of the Souls series and the final installment of the Dark Souls trilogy, the game was released in Japan in March 2016 and worldwide a month later. Two downloadable content (DLC) expansions, Ashes of Ariandel and The Ringed City, were also made for the game. Dark Souls III was critically and commercially successful, with critics calling it a worthy and fitting conclusion to the series. It was the fastest-selling game in Bandai Namco's history, shipping over three million copies within its first two months and over 10 million by 2020. A complete version containing the base game and both expansions, Dark Souls III: The Fire Fades, was released in April 2017.",
        platforms:["PC", "PS4", "XBOX"]
    },{//10
        name: "Sekiro: Shadows Die Twice",
        publisher: "Activision",
        publish: new Date("2019-03-22"),
        genre: ["ACTION", "ADVENTURE"],
        filename: "../assets/img/sample/Sekiro.jpg",
        description: "Sekiro: Shadows Die Twice is an action-adventure video game developed by FromSoftware and published by Activision. The game follows a shinobi known as Wolf as he attempts to take revenge on a samurai clan who attacked him and kidnapped his lord. It was released for Microsoft Windows, PlayStation 4, and Xbox One in March 2019, and will be released for Stadia in October 2020. Gameplay is focused on stealth, exploration, and combat, with a particular emphasis on boss battles. The game takes place in a fictionalized Japan set during the Sengoku period, and makes strong references to Buddhist mythology and philosophy. While creating the game, lead director Hidetaka Miyazaki wanted to create a new intellectual property (IP) that marked a departure from the Souls series of games also made by FromSoftware, and looked to series such as The Mysterious Murasame Castle and Tenchu for inspiration.",
        platforms: ["PS4","PC","Xbox One"]
    },{
        name: "DOTA 2",
        publisher: "Valve",
        publish: new Date("2013-07-09"),
        genre: ["MOBA", "MULTIPLAYER","STRATEGY","PVP"],
        filename: "../assets/img/sample/dota2.jpg",
        description: "Competitive balance is Dota's crown jewel, and to ensure everyone is playing on an even field, the core content of the game—like the vast pool of heroes—is available to all players. Fans can collect cosmetics for heroes and fun add-ons for the world they inhabit, but everything you need to play is already included before you join your first match. Development of Dota 2 began in 2009 when IceFrog, lead designer of Defense of the Ancients, was hired by Valve to create a modernized remake for them in the Source game engine. It was officially released for Microsoft Windows, OS X, and Linux-based personal computers via the digital distribution platform Steam in July 2013, following a Windows-only open beta phase that began two years prior. The game is fully free-to-play with no heroes or any other gameplay element needing to be bought or otherwise unlocked. To maintain it, Valve supports the game as a service, selling loot boxes and a battle pass subscription system called Dota Plus that offer non-gameplay altering virtual goods in return, such as hero cosmetics and audio replacement packs. The game has also been updated with various other features since release, such as a port to the Source 2 engine and support for virtual reality.",
        platforms: ["PC"]
    },{
        name: "League of Legends",
        publisher: "RIOT",
        publish: new Date("2009-10-27"),
        genre: ["MOBA", "MULTIPLAYER","STRATEGY","PVP"],
        filename:"../assets/img/sample/lol.jpg",
        description: "League of Legends (LoL) is a multiplayer online battle arena video game developed and published by Riot Games for Microsoft Windows and macOS. Inspired by Defense of the Ancients. In League of Legends, players assume the role of a champion with unique abilities and battle against a team of other player- or computer-controlled champions. The goal is usually to destroy the opposing team's Nexus, a structure that lies at the heart of a base protected by defensive structures, although other distinct game modes exist as well with varying objectives, rules, and maps. Champions span a variety of roles and blend a variety of fantasy tropes, tied to a fictional universe developed by Riot Games through short stories, comics, cinematics, and books. League of Legends was well received upon its release, earning praise for its diverse artistic and musical departments, particularly for its character design and production value. By July 2012, it was the most played PC game in North America and Europe in terms of the number of hours played. League has large footprint in streaming media communities on platforms such as YouTube and Twitch; it routinely ranks first in the most-watched hours. In September 2016, Riot Games estimated that there are over 100 million active players each month, and in September 2019, the company claimed that the game boasts nearly 8 million peak concurrent users each day.",
        platforms: ["PC"]
    },{
        name: "Demon's Souls",
        publisher: "From Software",
        publish: new Date("2009-02-05"),
        genre: ["ACTION", "ADVENTURE","RPG","MULTIPLAYER"],
        filename:"../assets/img/sample/Demon'sSouls.jpg",
        description: "Demon's Soul is an action role-playing game developed by FromSoftware for the PlayStation 3 under the supervision of SCE Japan Studio. It was published in Japan by Sony Computer Entertainment in February 2009, in North America by Atlus USA in October 2009, and in PAL territories by Namco Bandai Games in June 2010. The game is referred to as a spiritual successor to FromSoftware's King's Field series. Demon's Souls is set in Boletaria, a kingdom consumed by a dark being called the Old One following its release through the use of forbidden Soul Arts. Players take on the role of a hero brought to Boletaria to kill its fallen king Allant and pacify the Old One. Gameplay has players navigating five different worlds from a hub called the Nexus, with a heavy emphasis on challenging combat and mechanics surrounding player death and respawning. Online multiplayer allows both player cooperation and world invasions featuring player versus player combat.",
        platforms: ["PS3"]
    },{
        name: "Bloodborne",
        publisher: "From Software",
        publish: new Date("2015-03-24"),
        genre: ["ACTION", "ADVENTURE","RPG","MULTIPLAYER"],
        filename:"../assets/img/sample/Bloodborne.jpg",
        description: "Bloodborne is an action role-playing game developed by FromSoftware and published by Sony Computer Entertainment for the PlayStation 4. It was released worldwide in March 2015. Bloodborne follows the player's character, a Hunter, through the decrepit Gothic, Victorian era–inspired city of Yharnam, whose inhabitants have been afflicted with an abnormal blood-borne disease. Ultimately attempting to find the source of the plague, the player's character unravels the city's intriguing mysteries while fighting beasts and cosmic beings.",
        platforms: ["PS4"]
    },{
        name: "Danganronpa: Trigger Happy Havoc",
        publisher: "Spike Chunsoft Co., Ltd.",
        publish: new Date("2010-10-25"),
        genre:["ADVENTURE","VISUAL NOVEL","MURDERY MYSTERY"],
        filename: "../assets/img/sample/danganronpa.jpg",
        description: "Hope's Peak Academy is home to Japan's best and brightest high school students—the beacons of hope for the future. But that hope suddenly dies when Makoto Naegi and his classmates find themselves imprisoned in the school, cut off from the outside world and subject to the whims of a strange, murderous little bear named Monokuma. He pits the students against each other, promising freedom to anyone who can murder a fellow classmate and get away with it. It's up to you to find out who Monokuma really is, and why you've been taken from the world you once knew. But be careful what you wish for—sometimes there’s nothing more deadly than the truth...",
        platforms: ["PSP","Android","iOS","PSVita","PC","PS4"]
    },{
        name: "Danganronpa 2: Goodbye Despair",
        publisher: "Spike Chunsoft Co., Ltd.",
        publish: new Date("2012-07-26"),
        genre:["ADVENTURE","VISUAL NOVEL","MURDERY MYSTERY"],
        filename: "../assets/img/sample/danganronpa2.jpg",
        description: "Jabberwock Island – once a popular tourist destination, this now uninhabited island remains oddly pristine. You and your classmates at the elite Hope's Peak Academy have been brought to this island by your super-cute teacher for a “lovey-dovey, heart-throbbing school trip.” Everyone seems to be having fun in the sun...until Monokuma returns to restart his murderous game! Trapped on this island of mutual killing, your only hope of escape rests in solving the island’s mysteries. But be warned—sometimes the truth can be its own despair...",
        platforms: ["PSP","Android","iOS","PSVita","PC","PS4"]
    },{
        name: "Danganronpa v3:Killing Harmony",
        publisher: "Spike Chunsoft Co., Ltd.",
        publish: new Date("2017-01-12"),
        genre:["ADVENTURE","VISUAL NOVEL","MURDERY MYSTERY"],
        filename: "../assets/img/sample/danganronpa3.jpg",
        description: "Welcome to a new world of Danganronpa, and prepare yourself for the biggest, most exhilarating episode yet. Set in a “psycho-cool” environment, a new cast of 16 characters find themselves kidnapped and imprisoned in a school. Inside, some will kill, some will die, and some will be punished. Reimagine what you thought high-stakes, fast-paced investigation was as you investigate twisted murder cases and condemn your new friends to death.",
        platforms: ["Android","iOS","PSVita","PC","PS4"]
    },{
        name: "Counter-Strike: Global Offensive",
        publisher: "Valve",
        publish: new Date("2012-08-21"),
        genre:["FPS","ACTION","MULTIPLAYER"],
        filename: "../assets/img/sample/CSGO.jpg",
        description: "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter video game developed by Valve and Hidden Path Entertainment. It is the fourth game in the Counter-Strike series and was released for Windows, OS X, Xbox 360, and PlayStation 3 in August 2012, while the Linux version was released in 2014. The game pits two teams against each other: the Terrorists and the Counter-Terrorists. Both sides are tasked with eliminating the other while also completing separate objectives. The Terrorists, depending on the game mode, must either plant the bomb or defend the hostages, while the Counter-Terrorists must either prevent the bomb from being planted, defuse the bomb, or rescue the hostages. There are nine game modes, all of which have distinct characteristics specific to that mode. The game also has matchmaking support that allows players to play on dedicated Valve servers, as well as allowing members of the community to host their own servers with custom maps and game modes. A battle-royale game-mode, Danger Zone, was introduced in 2018.",
        platforms: ["PC"]
    },{
        name: "PlayerUnknown's Battlegrounds",
        publisher: "PUBG Corporation",
        publish: new Date("2017-12-21"),
        genre:["FPS","ACTION","MULTIPLAYER", "BATTLE ROYALE"],
        filename: "../assets/img/sample/pubg.jpg",
        description: "PlayerUnknown's Battlegrounds (PUBG) is an online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole. The game is based on previous mods that were created by Brendan PlayerUnknown Greene for other games, inspired by the 2000 Japanese film Battle Royale, and expanded into a standalone game under Greene's creative direction. In the game, up to one hundred players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves. The available safe area of the game's map decreases in size over time, directing surviving players into tighter areas to force encounters. The last player or team standing wins the round.",
        platforms: ["PC"]
    },{
        name:"Fallout 4",
        publisher:"Bethesda Softworks",
        publish:new Date("10/11/2015"),
        genre:["ACTION", "RPG", "POST-APOCALYPTIC"],
        filename:"../assets/img/sample/fallout4.jpg",
        description:"Fallout 4 is an action role-playing game developed by Bethesda Game Studios and published by Bethesda Softworks. It is the fourth main game in the Fallout series and was released worldwide on November 10, 2015, for Microsoft Windows, PlayStation 4 and Xbox One. The game is set within an open world post-apocalyptic environment that encompasses the city of Boston and the surrounding Massachusetts region known as The Commonwealth. It makes use of a number of local landmarks, including Bunker Hill, Fort Independence (Massachusetts), and Old North Bridge near Concord, as the bridge out of Sanctuary Hills. The main story takes place in the year 2287, ten years after the events of Fallout 3 and 210 years after The Great War, which caused catastrophic nuclear devastation across the United States. The player assumes control of a character referred to as the Sole Survivor, who emerges from a long-term cryogenic stasis in Vault 111, an underground nuclear fallout shelter. After witnessing the murder of their spouse and kidnapping of their son, the Sole Survivor ventures out into the Commonwealth to search for their missing child. The player explores the game's dilapidated world, completes various quests, helps out factions, and acquires experience points to level up and increase the abilities of their character. New features to the series include the ability to develop and manage settlements and an extensive crafting system where materials scavenged from the environment can be used to craft drugs and explosives, upgrade weapons and armor, and construct, furnish and improve settlements. Fallout 4 also marks the first game in the series to feature full voice acting for the protagonist.",
        platforms:["PC", "PS4", "Xbox One"]
    }]).then(function(){
        console.log("Is it in yet?(1)")
    })
    let valorant = await gameModel.findOne({name:"VALORANT"})
    let valorantID = valorant._id
    let warframe = await gameModel.findOne({name:"Warframe"})
    let warframeID = warframe._id
    let pubg = await gameModel.findOne({name:"PlayerUnknown's Battlegrounds"})
    let pubgID = pubg._id

    userModel.insertMany([{
        userType: "member",
        username: "lolz",
        password: "cisco",
        email: "lolz@gmail.com",
        gameList:[
            {game:valorantID, status:"Playing", rating:8, review:"I love this game! EZ jett main"}]
    },{
        userType: "member",
        username: "yaptot",
        password: "class",
        email: "yaptot@gmail.com",
        gameList:[
            {game:valorantID, status:"Playing", rating:9, review:"I love this game! Kaso binubuhat ako ni Eugene kaya ok lang!"},
            {game:pubgID, status:"Playing", rating:9, review:"I love this game! Kaso binubuhat ako ni Eugene kaya ok lang!"}]
    },{
        userType: "member",
        username: "voidgenon",
        password: "cisco",
        email: "voidgenon@gmail.com",
        gameList:[
            {game:valorantID, status:"Playing", rating:7, review:"Dali naman magbuhat dito"},
            {game:warframeID, status:"Playing", rating:10, review:"Gameplay is a 10. Lore is a 10. Doggy is a 100"}]
    },{
        userType: "member",
        username: "perez",
        password: "abcd12345",
        email: "eugeneperez123@gmail.com",
        gameList:[
            {game:valorantID, status:"Completed", rating:10, review:""}]
    }]).then(function(){
        console.log("Is it in yet?(2)")
    })
})

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
            ave.push({game: dbgames[i].name, aveRating: ratings[i].rating/ratings[i].count, count:ratings[i].count});
        }
        
        ave.sort((a, b) => b.aveRating - a.aveRating);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/');
});

app.get("/", async (req, res)=>{
    try {
        var users = await userModel.find({}).populate("gameList.game")
        var dbgames = await gameModel.find({})
        var ratings = [], games = [];
        
        for (let i = 0; i < dbgames.length; i++) {
            ratings.push({game: dbgames[i].name, rating: 0, count: 0});
            for (let j = 0; j < users.length; j++) {
                let index = users[j].gameList.findIndex(e => e.game.name === dbgames[i].name && e.game.rating !== null);
                if (index !== -1) {
                    ratings[i].rating += users[j].gameList[index].rating;
                    ratings[i].count++;
                }
            }
            games.push({_id:dbgames[i]._id, game: dbgames[i].name, filename: dbgames[i].filename, aveRating: ratings[i].rating/ratings[i].count, count:ratings[i].count});
        }
        
        ave = games.sort((a, b) => b.aveRating - a.aveRating)
        count = games.sort((a, b) => b.count - a.count)
        ave = ave.slice(0, 5)
        count = games.slice(0, 5)
    } catch (e) {
        console.log(e);
    }
    res.render("index",{
        user:req.session.user,
        ave:ave,
        count:count
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
                res.status(200).send({msg: "Successfully Registered!"})
            }
        })
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async (req, res) => {
    
    let {username} = req.body
    let {password} = req.body
    let result = await userModel.findOne({
        username: username,
        password: password
    }).populate("gameList.game")
    if (result) {
        req.session.user = result
        res.status(200).send({msg: "Log-in successful!"})
    } else {
        res.status(403).send({msg: "Incorrect username/password!"})
    }
})


app.get("/signout", (req, res)=>{
    req.session.destroy()
    res.redirect("/")
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
        mylist: true,
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

//needs improvement
app.get("/search",function(req,res){
    if(req.query.q == '?' || req.query.q == '*'){
        res.render("search", {
            error_search:true,
            search:req.query.q,
            user:req.session.user
        })
    }else{
        let search = new RegExp (req.query.q,'gi')
        let name = req.query.q
        gameModel.aggregate([{$match: {name: search}}], function (err, data) {
            if(err) console.log(err)
            res.render("search", {
                error_search: data.length == 0 ? true : false,
                search:name,
                searchname: JSON.parse(JSON.stringify(data)),
                user:req.session.user
            })
        })
    }
    
})

app.get("/genre/:genre",async (req, res)=>{
    let genre = req.params.genre
    await gameModel.find({genre:genre}, function(err, data){
        res.render("search", {
            error_search: data.length == 0 ? true : false,
            search:genre,
            searchname:JSON.parse(JSON.stringify(data)),
            user:req.session.user
        })
    })
})

app.get("/platform/:platform",async (req, res)=>{
    let platform = req.params.platform
    console.log(platform)
    await gameModel.find({platforms:platform}, function(err, data){
        res.render("search", {
            error_search: data.length == 0 ? true : false,
            search:platform,
            searchname:JSON.parse(JSON.stringify(data)),
            user:req.session.user
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

app.post("/addList/:_id",async function(req, res){
    let game = req.params._id
    let status = req.body.status
    console.log(game)
    console.log(status)

    let user = {username:req.session.user.username}
    let dbGame = await gameModel.findOne({_id:game})
    console.log("db"+dbGame)
    userModel.findOneAndUpdate(user, {$push: {gameList: {game: dbGame, status: status, rating:null, review:null}}}, {useFindAndModify: false},async function(err){
        if(err){
           console.log(err) 
        }
        else{
            req.session.user = await userModel.findOne({username:user.username})
            res.redirect("/viewGame/"+game)
        }
    })
})

app.get("/getList",async function(req, res){ //req.session.user.username
    let user = await userModel.findOne({username:req.session.user.username}).populate("gameList.game")
    req.session.user = user
    console.log(user)
    res.render("myList",{
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

app.post("/updateStatus/:_id", async function(req, res) {
    let id = req.params._id
    let status = req.body.status
    let game = await gameModel.findOne({_id:id})

    var user = await userModel
            .findOne({username: req.session.user.username})
            .populate('gameList.game')
    if (user) {
        console.log(user)
        user.gameList.forEach(e => {
            if (e.game.name === game.name) e.status = status;
        })
        await user.save()
        req.session.user = user
        res.redirect("/viewGame/"+id)
    }
})

app.get("/viewGame/:_id",async  function(req,res){
    let game = req.params._id
    let dbgame = await gameModel.findOne({_id:game})
    var users = await userModel.find({}).populate("gameList.game");
    var dbgames = await gameModel.find({});
    var ratings = [], ave = [], reviews = [];
    let notListed = false
    let reviewedtext
    let isReviewed = false
    
    if(req.session.user){
    let user = await userModel
                    .findOne({username:req.session.user.username})
                    .populate("gameList.game")
        if(!(user.gameList.filter(e=> e.game.name === dbgame.name).length)){
            console.log("in")
            notListed=true
        }
        
        user.gameList.forEach(e=>{
            if(e.game.name === dbgame.name){
                if(e.review != null){
                    reviewedtext = e.review
                    isReviewed = true
                }
            }
        })
    }
    for(i=0;i<users.length;i++){
        users[i].gameList.forEach(e => {
            if(e.game.name === dbgame.name && e.rating !== null){
                reviews.push({username:users[i].username, rating:e.rating, review:e.review})
            }
        })
    }
    
    try{
        for (let i = 0; i < dbgames.length; i++) {
            ratings.push({game: dbgames[i].name, rating: 0, count: 0});
            for (let j = 0; j < users.length; j++) {
                let index = users[j].gameList.findIndex(e => e.game.name === dbgames[i].name && e.game.rating !== null);
                if (index !== -1) {
                    ratings[i].rating += users[j].gameList[index].rating;
                    ratings[i].count++;
                }
            }
            ave.push({game: dbgames[i].name, aveRating: ratings[i].rating/ratings[i].count, count:ratings[i].count});
        }
        
        ave.sort((a, b) => b.aveRating - a.aveRating);
    } catch (e) {
        console.log(e);
    }

    let aveRating = ave.filter(e => e.game === dbgame.name)[0].aveRating
    if( aveRating > 0){
        isRated = true
    }else{
        aveRating = 0
    }
    console.log("notListed "+notListed)
    res.render("gamePage",{
        user:req.session.user,
        reviews:reviews,
        isReviewed:isReviewed,
        reviewedtext:reviewedtext,
        game:JSON.parse(JSON.stringify(dbgame)),
        aveRating:aveRating,
        count:ave.filter(e => e.game === dbgame.name)[0].count,
        notListed:notListed
    })
})

app.post("/addReview/:_id", async function(req, res){
    let rating = req.body.rating
    console.log("rating "+rating)
    let review = req.body.review
    console.log("review "+review)
    let id = req.params._id
    console.log("id "+id)
    let game = await gameModel.findOne({_id:id})
    console.log("game "+game)

    let user = await userModel.findOne({username:req.session.user.username}).populate("gameList.game")
    
    user.gameList.forEach(async e => {
        if (e.game.name === game.name){
            console.log(e.rating+ "===" +rating)
            e.rating = rating
            if(review)
            e.review = review
        }
        await user.save()
    })
    res.redirect("/viewGame/"+id)
})

app.get("/profile", async function(req, res) {
    let user = await userModel.findOne({username:req.session.user.username}).populate("gameList.game");
    user = JSON.parse(JSON.stringify(user));
    req.session.user = user;

    console.log(user)
    res.render("profile",{
        user:user,
        profpage: true
    })
})

app.listen(3000, function(){
    console.log("I love you 3000")
})