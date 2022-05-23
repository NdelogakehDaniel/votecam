const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./routes/UserRoutes.js')
const admin = require('./routes/AdminRoutes.js')
const votes = require('./routes/VotingRoutes.js')
const candidates = require('./routes/CandidatesRoutes.js')
const logs = require("./routes/LogRoutes")
const messages = require("./routes/MessageRoutes")
const requests = require("./routes/RequestRoutes")
const idcards = require("./routes/IdCardsRoutes")
const voteid = require("./routes/VoteidRoutes")
const notifications = require("./routes/NotificationRoutes")


const dbConn = require('./connection.js')
const ReadText = require('text-from-image')



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const corsOptions = {
    headers: '*'
  };

app.use(cors(corsOptions))

//connecting to the database
dbConn.connect((err)=>{
    if(err) throw err;
    console.log("Database connected with success !!!")
})

//calling all my routes
app.use("/users",users)
app.use("/votes",votes)
app.use("/candidates",candidates)
app.use("/admin",admin)
app.use("/logs",logs)
app.use("/messages",messages)
app.use("/requests",requests)
app.use("/notifications",notifications)
app.use("/idcards",idcards)
app.use("/voteid",voteid)

// app.get("/",(req,res)=>{
//     let data = ""
//     ReadText('./images/id1.jpeg')
//     .then(text => {
//         console.log(text)
//         res.json({data: text}).status(200)
//     }).catch(err => {
//         console.log(err);
//     })
// })

app.get("/",(req,res)=>{
    res.send("<h1>Welcome To VoteCam Backend !!!<br /> Lanunch the /create-table end point to create all your tables</h1>")
})

//route to create all database tables
app.get("/create-tables",(req,res)=>{
    let result = true;
    dbConn.query("create table candidates (id int primary key auto_increment,name varchar(255),party varchar(255),statement varchar(255),image varchar(255),age int)",(err,row)=>{
        if(!err){
            console.log("Candidates Tables Created Successfully !!!");
        }else{
            result= false;
        }
    })

    dbConn.query("create table users (id int primary key auto_increment,votecode int)",(err,row)=>{
        if(!err){
            console.log("Users Tables Created Successfully !!!");
        }else{
            result= false;
        }
    })

    dbConn.query("create table voteid (id int primary key auto_increment,vote_code varchar(255),idcard_num varchar(255))",(err,row)=>{
        if(!err){
            console.log("Voteid Tables Created Successfully !!!");
        }else{
            result= false;
        }
    })

    dbConn.query("create table votes (id int primary key auto_increment,vote_code varchar(255),candidateid int)",(err,row)=>{
        if(!err){
            console.log("Votes Tables Created Successfully !!!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[101271315],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[101261315],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[121261211],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[121261210],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[121261200],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into idcards(code) values(?)",[121260200],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    }) 

    dbConn.query("insert into voteid(vote_code,idcard_num) values(?,?)",["ae1f54","121260200"],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into votes(vote_code,candidateid) values(?,?)",["ae1f54",1],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into candidates (name,party,age,statement,image) values(?,?,?,?,?)",["Paul Biya","CPDM",89,"Paul Biya (born Paul Barthélemy Biya'a bi Mvondo; 13 February 1933) is a Cameroonian politician who has served as the president of Cameroon since 6 November 1982. He is the second-longest-ruling president in Africa, the oldest head of state in Africa, and the longest-ruling non-royal leader in the world.","https://firebasestorage.googleapis.com/v0/b/alice-blockchain.appspot.com/o/Paul_Biya_2014.png?alt=media&token=0f22e79f-758a-4487-a010-7a5a94e69122"],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into candidates (name,party,age,statement,image) values(?,?,?,?,?)",["Cabral Libii"," PCRN ",44,"Cabral Libii est né le 29 mars 1980 à Ekoamaen (Région du Centre, Cameroun), de Paul Ngué Ngué. Il est jumeau et premier enfant. Sa sœur jumelle ne survit pas. Il est né sous un arbre, sa mère étant en chemin vers la maternité","https://firebasestorage.googleapis.com/v0/b/alice-blockchain.appspot.com/o/cabral.jpg?alt=media&token=2094c119-cc99-4988-85ca-99b0069a37b9"],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    dbConn.query("insert into candidates (name,party,age,statement,image) values(?,?,?,?,?)",["Ni John Fru Ndi"," SDF ",85,"Ni John Fru Ndi is a Cameroonian politician. He founded the Social Democratic Front, the main opposition party in Cameroon, in 1990. He failed to get elected as a senator in 2013.","https://firebasestorage.googleapis.com/v0/b/alice-blockchain.appspot.com/o/ni.jpg?alt=media&token=8db34ab8-9256-4885-aada-7c0040d04b60"],(err,rows)=>{
        if(!err){
            console.log("Row not inserted !!");
        }else{
            result= false;
        }
    })

    if(result)
        res.send("<h2>All Tables Created Successfully !!!</h2>")

})


const port = process.env.PORT || 5003
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})