db = require("../connection.js")
const router = require("express").Router()
const crypto = require("crypto")

//route to get all voteids
router.get("/",(req,res)=>{
    db.query("select * from voteid",async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to get a particular voteid
router.get("/:code",(req,res)=>{
    db.query("select count(id) as result from voteid where vote_code=?",[req.params.code],(err,rows,field)=>{
        if(err){
            res.json({result:'error'}).status(500)
        }else if(rows[0].result>0){
            res.json({result:'success'}).status(201)
        }else{
            console.log(rows)
            res.json({result:'error'}).status(201)
        }
    })
})

//route to add a new voteid
router.post("/",(req,res)=>{
    const randomCode = crypto.randomBytes(3).toString('hex');
    
    db.query("select count(id) as result from voteid where vote_code=? or idcard_num=?",[randomCode,req.body.idcard_num],(err,rows,fields)=>{
        if(err){
            res.json({result: 'error'}).status(500)
        }else if(rows[0].result <= 0){
            db.query("insert into voteid(vote_code,idcard_num) values(?,?)",[randomCode,req.body.idcard_num],(err,rows,field)=>{
                if(err){
                    console.log(err)
                    res.json({result:'error'}).status(500)
                }else{
                    res.json({result:'success',data: randomCode}).status(201)
                }
            })
        }
    })
})

//route to delete a message
router.delete("/:id",(req,res)=>{
    db.query("delete from voteid where vote_code=?",[req.params.code],async (err,rows,field)=>{
        if(!err==null){
            await res.json({result:'success'}).status(201)
        }else{
           res.json({result:'error'}).status(500)
        }
    })
})

module.exports = router