db = require("../connection.js")
const router = require("express").Router()

var cand=[]

//route to get all candidates
router.get("/", (req,res)=>{
    db.query("select * from candidates",(err,rows,field)=>{
        if (err){
            throw err;
        }else{
           setCand(rows)
           res.json(cand).status(200)
        }
        // await res.json(rows).status(200)
    })
})

var positions=[]
//function to set a candidate
async function setCand(data){
    cand=[]

    //getting votes of every candidate
    for(let i in data){
        db.query("select count(id) as result from votes where candidateid=?",[data[i].id],async (err,rows)=>{
            if(err) throw err;
            let obj = {
                candidateid: data[i].id,
                votes: await rows[0].result,
                percentage: ''
            }

            positions[i] = await obj;
        })
    }
    if(positions.length>0){
        let sum = 0;
        for(let i in positions){
            sum +=positions[i].votes
        }
        for(let i in positions){
            positions[i].percentage = ((positions[i].votes/sum)*100).toFixed(2)+"%";
        }

        for(let i in data){
            let obj ={
                id: data[i].id,
                name: data[i].name,
                biography: data[i].statement,
                image: data[i].image,
                votes:positions[i].votes,
                percentage: positions[i].percentage
            }

            cand.push(obj)
        }

        console.log(cand)
    }

}

//route to get a particular candidates information
router.get("/:id",(req,res)=>{
    db.query("select * from candidates where id=?",[req.params.id],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to add a new candidate
router.post("/add",(req,res)=>{
    db.query("insert into candidates(name,party,age,statement) values(?,?,?,?)",[req.body.name,req.body.party,req.body.age,req.body.statement],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'Candidate added successfully !!!'}).status(201)
        }else{
           res.json({error:'An error occured try again !!!'}).status(500)
        }
    })
})

//route to delete a user
router.delete("/:id",(req,res)=>{
    db.query("delete from candidates where id=?",[req.params.id],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'Candidate deleted successfully !!!'}).status(201)
        }else{
           res.json({error:'An error occured try again !!!'}).status(500)
        }
    })
})

module.exports = router