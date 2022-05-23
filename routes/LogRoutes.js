db = require("../connection.js")
const router = require("express").Router()

//route to get all logs
router.get("/",(req,res)=>{
    db.query("select * from logs",async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})


//route to get all logs that concerns a particular username
router.get("/:name",(req,res)=>{
    db.query("select * from logs where name like ?",["%"+req.params.name+"%"],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//gettings latest 5 routes a particular user
router.get("/:name/:num",(req,res)=>{
    let num = parseInt(req.params.num)
    db.query("select * from logs where name like ? order by id desc limit ?",["%"+req.params.name+"%",num],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to add a new candidate
router.post("/",(req,res)=>{
    db.query("insert into logs(name,message,concerned) values(?,?,?)",[req.body.name,req.body.message,req.body.concerned],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'Log added successfully !!!'}).status(201)
        }else{
           res.json({error:'An error occured try again !!!'}).status(500)
        }
    })
})

//route to delete a user
router.delete("/:id",(req,res)=>{
    db.query("delete from logs where id=?",[req.params.id],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'log deleted successfully !!!'}).status(201)
        }else{
           res.json({error:'An error occured try again !!!'}).status(500)
        }
    })
})

module.exports = router