db = require("../connection.js")
const router = require("express").Router()

//route to get all messages
router.get("/",(req,res)=>{
    db.query("select * from messages",async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})


//getting a message with a particular request_code
router.get("/:code",(req,res)=>{
    db.query("select * from messages where request_code = ?",[req.params.code],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//gettings the messages that are not yet read
router.get("/unread",(req,res)=>{
    let num = parseInt(req.params.num)
    db.query("select * from messages where status = ?",["0"],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to add a new message
router.post("/",(req,res)=>{
    db.query("insert into messages(receiver,subject,message,request_code) values(?,?,?,?)",[req.body.receiver,req.body.subject,req.body.message,req.body.request_code],(err,rows,field)=>{
        if(err){
            res.json({result:'error'}).status(500)
        }else{
            res.json({result:'success'}).status(201)
        }
    })
})

//route to delete a message
router.delete("/:id",(req,res)=>{
    db.query("delete from messages where id=?",[req.params.id],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'success'}).status(201)
        }else{
           res.json({result:'error'}).status(500)
        }
    })
})

module.exports = router