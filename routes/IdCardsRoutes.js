db = require("../connection.js")
const router = require("express").Router()

//route to get all codes
router.get("/",(req,res)=>{
    db.query("select * from idcards",async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to get a particular code
router.get("/:code",(req,res)=>{
    db.query("select count(id) as result from idcards where code=?",[req.params.code],async (err,rows,field)=>{
        if(err){
            res.json({result:'error'}).status(500)
        }else if(await rows[0].result>0){
            res.json({result:'success'}).status(201)
        }else{
            res.json({result:'error'}).status(201)
        }
    })
})

//route to add a new message
router.post("/",(req,res)=>{
    db.query("insert into idcards(code) values(?)",[req.body.code],(err,rows,field)=>{
        if(err){
            res.json({result:'error'}).status(500)
        }else{
            res.json({result:'success'}).status(201)
        }
    })
})

//route to delete a message
router.delete("/:id",(req,res)=>{
    db.query("delete from idcards where code=?",[req.params.code],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'success'}).status(201)
        }else{
           res.json({result:'error'}).status(500)
        }
    })
})

module.exports = router