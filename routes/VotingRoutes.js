const db = require('../connection.js')
const router = require('express').Router()
const hasher = require("../functions/functions")

//route to get all routes
router.get("/",(req,res)=>{
    db.query("select * from votes",async (err,rows,field)=>{
        if (err) throw err;
        res.json(rows).status(200)
    })
})

//function to zero before number in case it's less than 10
function addZero(value){
    if(value<10){
        value="0"+value
    }
    return value;
}

//function to hash and send data
function hashVotes(value){
    let data = []
    value.forEach(item => {
        let date = new Date(item.date);
       date = date.getFullYear()+"-"+addZero(date.getMonth())+'-'+addZero(date.getDay())+" "+addZero(date.getHours())+":"+addZero(date.getMinutes())+":"+addZero(date.getSeconds());
       
        let obj = {
            id: item.id,
            vote_code: hasher.hash(item.vote_code),
            candidate: item.candidateid,
            time: date
        }

        data.push(obj)
        data.sort((a,b)=> a.id - b.id)
    });

    return data;
}

//route to display latest 10 votes
router.get("/recent",(req,res)=>{
    db.query("select * from votes order by id desc limit 10",async (err,rows,field)=>{
        if(err){
            throw err;
        }else{
            res.json(hashVotes(rows)).status(200)
        }
    })
})

//route to permit a user to vote
router.post("/add",(req,res)=>{
    db.query("select count(vote_code) as result from votes where vote_code=?",[req.body.vote_code],async (err,rows)=>{
        if(err){
            res.json({result:err}).status(500)
        }else if(await rows[0].result > 0){
            console.log("Vote Existence: ",rows[0].result)
            res.json({result:'exist'}).status(201)
        }else{
            db.query("insert into votes(vote_code,candidateid) values(?,?)",[req.body.vote_code,req.body.candidateid],(err,rows,field)=>{
                if(err){
                    console.log(err)
                    res.json({result:err}).status(500)
                }else{
                    res.json({result:'success'}).status(201)
                }
            })
        }
    })
})

//function to get regional votes
var voters=[]
var votes = []
router.get("/regional",(req,res)=>{
    let result = [
        {city:'Bamenda',value:0},
        {city:'Douala',value:0},
        {city:'Yaounde',value:0},
        {city:'Bertoua',value:0},
        {city:'Bafoussam',value:0},
        {city:'Buea',value:0},
        {city:'Ebolowa',value:0},
        {city:'Garoua',value:0},
        {city:'Ngaoundere',value:0},
        {city:'Maroua',value:0},
    ]
   
    db.query("select vote_code from votes",(err,rows,fields)=>{
        if(err){
         throw err;
        }else{
        setVotes(rows)
        }
    })

    db.query("select * from users",(err,rows,fields)=>{
        if(err){ 
        throw err;
       }else{
        setVoters(rows)
       }
    })

    //functions to compute the regional statitics
    res.json(regionalStatitics(result)).status(200)
})

function setVoters(value){
    voters=value
}
function setVotes(value){
    votes = value
}

//function to get the index of an object
function index(arr,search){
    for(let i in arr){
        if(arr[i].city===search)
            return i
    }
}


//function to get the index of an object
function city(arr,search){
    for(let i in arr){
        if(arr[i].id===search)
            return arr[i].address
    }
}

//function to get regiona statitics
function regionalStatitics(result){
    for(let i in votes){
        console.log("Index: "+index(result,city(voters,votes[i].vote_code)))
        result[index(result,city(voters,votes[i].vote_code))].value+=1 
    }
    return result;
}

//route to get votes distribution per candidate
var all_votes =[]
router.get("/vote_per_cand",(req,res)=>{

    db.query("select * from votes",(err,rows,fields)=>{
        if(err){
            throw err;
        }else{
            setAllVotes(rows)
        }
    })

    db.query("select * from candidates",(err,rows,fields)=>{
        if(err){
            throw err;
        }else{
            res.json(updateCandidatesValue(setCandidate(rows))).status(200);
        }
    })    
})

//function to set candidates array
function setCandidate(value){
    let candidates = []; 
    for(let i in value){
        let obj = {
            id: value[i].id,
            name: value[i].name,
            party: value[i].party,
            value: 0
        }
        candidates.push(obj)
    }
    return candidates;
}

//function to set all votes array
function setAllVotes(value){
    all_votes = value;
}

//function to get the index of a voter
function indexCandidate(arr,search){
    for(let i in arr){
        if(arr[i].id===search)
            return i
    }
}

//funtion to update cnadidates votes
function updateCandidatesValue(candidates){
    for(let i in all_votes){
        candidates[indexCandidate(candidates,all_votes[i].candidateid)].value+=1
    }
    return candidates;
}








module.exports = router