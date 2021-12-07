const express = require('express')
const path = require("path")
const { render } = require('ejs')
const oauth2 = require('./scripts/oauth2')
const dbhandler = require("./scripts/dbhandler")
const card_generation = require("./scripts/card_generation")
const fs = require("fs")
const drivehandler = require("./scripts/drivehandler")
const drive = new drivehandler.driveHandler()
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');

const card_pool_info = JSON.parse(fs.readFileSync("./json/card_pool.json"));
let card_pool_by_id = {}
let card_pool = []
for (let i = 0; i < card_pool_info.length; i++) {
    if ((Date.now() >= card_pool_info[i].start) && (Date.now() < card_pool_info[i].expire || card_pool_info[i].expire === 0)) {
        card_pool_by_id[card_pool_info[i].card_pool_id]= card_pool_info[i]
        card_pool.push(card_pool_info[i])
    }
}
const drive_info = JSON.parse(fs.readFileSync("./json/drive_info.json"));
let drew = {"9J3CaaGif1NYQkrVCa2tkWEBhCDfDkHh":[]}

const admins_id = ["442138699493539840"]

const app = express()
const port = 8000

const countArray = (arr, target) => {
    var count = 0;
    for(let i = 0; i < arr.length; ++i){
        if(arr[i] === target)
            count++;
    }
    return count
}

function cache_login(req, res, next) {
    if (req.method == "GET") {
        if (!req.session.user_id && req.cookies.token) {
            jwt.verify(req.cookies.token, req.app.get("secret_key"), (err, decode) => {
                if (!err) {
                    console.log(decode)
                    const {user_id, username, avatar_hash, _, __ } = decode
                    const token = jwt.sign(
                        { user_id: user_id, username: username, avatar_hash: avatar_hash},
                        req.app.get("secret_key"),
                        {
                          expiresIn: "14d",
                        }
                    );
                    res.cookie("token", token)
                    req.session.user_id = user_id
                    req.session.username = username
                    req.session.avatar_hash = avatar_hash
                }
            })
        }
        
    }
    next()
}

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
const job = schedule.scheduleJob(rule, function(){
  /*dbhandler.clearDrew(() => {

  })*/
  for (const [key, value] of Object.entries(this.card_probability)) {
      drew[key] = []
  }
});

app.use(express.json())
app.use(express.urlencoded({parameterLimit: 100000, limit: '50mb', extended: true}))
app.use(express.static(path.join(__dirname, "static")));
app.use(session({secret: crypto.randomBytes(30).toString('hex'), resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(cache_login)
app.set('view engine', 'ejs');
app.set('secret_key', crypto.randomBytes(30).toString('hex'))

//global
app.post("/logout", (req, res) => {
    req.session.user_id = undefined
    req.session.username = undefined
    req.session.avatar_hash = undefined
    res.clearCookie("token");
    res.send({status:"success", url:"/"})
})

//------------------


//main menu
app.get("/", (req,res) => {
    user_id = req.session.user_id
    res.render("main_menu", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:true})
})

app.get("/callback", (req, res) => {
    oauth2.get_user(req.query.code, (result) => {
        const token = jwt.sign(
            { user_id: result.id, username: result.username + "#" + result.discriminator, avatar_hash: result.avatar},
            req.app.get("secret_key"),
            {
              expiresIn: "14d",
            }
        );
        let options = {
            maxAge: 1000 * 60 * 60 * 336, // would expire after 15 minutes
            httpOnly: true // The cookie only accessible by the web server
        }
        res.cookie('token', token, options)
        req.session.user_id = result.id
        req.session.username = result.username + "#" + result.discriminator
        req.session.avatar_hash = result.avatar
        return res.redirect('/');
    })    
})
//------------------

// draw card
app.get("/card", (req,res) => {
    let user_id = req.session.user_id
    if (user_id == undefined) {
        return res.redirect("/")
    }
    res.render("card", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:false})
})

app.post("/draw_card", (req, res) => {
    const total_amount = parseInt(req.body.amount)
    const user_id = req.session.user_id //get user id
    const target_card_pool = card_pool_by_id[req.body.card_pool_id]
    const cost = total_amount * target_card_pool.cost // get cost
    dbhandler.changePt(user_id, -cost, ({status, amount, msg}) => { //Deduct money
        if (status === "success") {
            let cards = []
            if (target_card_pool.limit > 0) {
                if (countArray(drew[req.body.card_pool_id], req.session.user_id) >= target_card_pool.limit) {
                    return res.send({status:"error", msg:"Limit reached"})
                }
                drew[req.body.card_pool_id].push(user_id)
            }
            const generate = new card_generation.generate({...target_card_pool.probability})
            let generated_card = []
            for (let i = 0; i < total_amount; i++) {
                generated_card.push(generate.all())
            }
            let upload_info = []
            for (let i = 0; i < generated_card.length; i++) {
                upload_info.push({name:generated_card[i].card_name, card_id: generated_card[i].card_id, stats: generated_card[i].stats})
            }
            dbhandler.addCard(user_id, upload_info, () => {
                for (let i = 0; i < generated_card.length; i++) {
                    const card = generated_card[i]
                    drive.dataUrl(card.file_id, (dataUrl) => { //card to dataurl
                        cards.push({"url":dataUrl,"stats":card.stats, "tier":card.tier})
                        if (cards.length == total_amount) {
                            return res.send({status:"success", amount:amount, cards:cards})
                        }
                    })
                }
            })
        } else {
            return res.send({"status":"error", "msg":msg})
        }
    })
})

app.post("/get_amount", (req,res) => {
    let user_id = req.session.user_id
    dbhandler.checkBalance(user_id, (result) => {
        res.send(result)
    })
})

app.post("/get_card_pool", (req,res) => {
    //console.log(card_pool)
    let result = {card_pools:[], amount:0}
    for (let i = 0; i < card_pool.length; i++) {
        result.card_pools.push({...card_pool[i]})
        if (card_pool[i].limit > 0) {
            result.card_pools[result.card_pools.length - 1].limit = countArray(drew[card_pool[i].card_pool_id], req.session.user_id) >= card_pool[i].limit
        } else {
            result.card_pools[result.card_pools.length - 1].limit = false
        }
        delete result.card_pools[result.card_pools.length - 1].id
        delete result.card_pools[result.card_pools.length - 1].start
    }
    dbhandler.checkBalance(req.session.user_id, (r) => {
        result.amount = r.amount
        res.send(result)
    })
})
//------------------


//collection
app.get("/collection", (req,res) => {
    user_id = req.session.user_id
    res.render("card_collection", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:false})
})

/*app.post("/get_cards", (req, res) => {
    const card_id = req.body.card_id
    if (card_id < 0 || card_id >= drive_info.cards.length) {
        return res.send({"status":"error"})
    }
    drive.dataUrl(drive_info.cards[card_id].drive_id, drive_info.cards[card_id].format, (result) => {
        if (result.status === "success") {
            return res.send(result)
        }
    })
})*/

app.post("/get_all_cards", (req, res) => {
    let all_cards = card_generation.all_cards()
    for (let i = 0; i < all_cards.length; i++) {
        all_cards[i].url = drive.getlink(all_cards[i].drive_id)
        delete all_cards[i].drive_id
    }
    res.send({status:"success", cards:all_cards})
})

app.post("/get_total_card", (req, res) => {
    res.send({status:"success", amount:drive_info.cards.length})
})

// news
app.get("/news", (req,res) => {
    user_id = req.session.user_id
    res.render("news-index", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username,footer:true})
})

app.get("/news/:news_id", (req,res) => {
    const id = req.params.news_id
    let news = JSON.parse(fs.readFileSync("./json/news.json"))[id]
    user_id = req.session.user_id
    res.render("news-content", {user_id:user_id, title: news.title, date: news.date, content: news.content, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:false})
})

app.post("/lastest_news", (req, res) => {
    const news = JSON.parse(fs.readFileSync("./json/news.json"))
    let result = []
    for (let i = 0; i < (news.length < 5 ? news.length  : 4); i++) {
        result.push(news[i])
    }
    res.send({status:"success", "result":result})
})

app.post("/get_all_news", (req, res) => {
    res.send({status:"success","result":JSON.parse(fs.readFileSync("./json/news.json"))}) 
})
//----------------------


//inventory
app.get("/inventory", (req,res) => {
    const user_id = req.session.user_id
    if (user_id == undefined) {
        return res.redirect("/")
    }
    res.render("inventory", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:false})
})  

app.post("/get_inventory", (req, res) => {
    const user_id = req.session.user_id
    dbhandler.getInventory(user_id, (result) => {
        for (let i = 0; i < result.cards.length; i++) {
            result.cards[i].url = drive.getlink(card_generation.card_info(result.cards[i].card_id).drive_id)
            result.cards[i].anime = card_generation.card_info(result.cards[i].card_id).anime
            result.cards[i].tier = card_generation.card_info(result.cards[i].card_id).tier
        }
        res.send(result)
    })
})
//------------------

//community
app.get("/community", (req,res) => {
    const user_id = req.session.user_id
    return res.render("community", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:true})
})
//------------------

//support
app.get("/support", (req,res) => {
    const user_id = req.session.user_id
    return res.render("support", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:true})
})
//------------------

app.get("/admin", (req,res) => {
    const user_id = req.session.user_id
    if (req){
        return res.render("admin", {user_id:user_id, admin: admins_id.includes(user_id), avatar_hash:req.session.avatar_hash, username:req.session.username, footer:false})
    }
})

app.post("/upload_card", (req, res) => {
    let {name, tier, anime, file, filename, format} = req.body
    file = Buffer.from(file, "base64")
    let cards = JSON.parse(fs.readFileSync("./json/cards_info.json"))
    drive.upload(file, filename, format, (driveId) => {
        cards.push({id:cards.length - 1, name:name, tier:tier, anime:anime, stats: { hp: [], str: [], def: [], agi: [] }, drive_id:driveId})
        res.send({"status":"success"})
    })
    //cards.push({id:cards.length - 1, name:name, tier:tier, anime:anime, stats: { hp: [], str: [], def: [], agi: [] }})
})

const host = "0.0.0.0"
app.listen(port, host, () => {
    console.log("Server listening at http://%s:%s", host, port); 
})