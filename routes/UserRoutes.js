const db = require('../connection.js')
const router = require('express').Router()

//route to get users into
router.get("/dashboard/:tablename",async (req,res)=>{
    let arr = []
    db.query(`select count(id) as result from ${req.params.tablename} `,(err,rows,fields)=>{
        if (err) throw err;
        res.json({data: rows[0].result})
    })
})

//route to get one users
router.get("/:id",(req,res)=>{
    db.query("select * from users where id=?",[req.params.id],async (err,rows,fields)=>{
        if(err) throw err;
        await res.status(200).json(rows)
    })
})

//route to get all users
router.get("/",(req,res)=>{
    db.query("select * from users",async (err,rows,fields)=>{
        if(err) throw err;
        res.status(200).json(rows)
    })
})


//route to add a user
router.post("/",(req,res)=>{
        db.query("insert into users(votecode) values(?)",
        [req.body.votecode],
        async (err,rows,fields)=>{
            if(err==null){
                await res.status(201).json({result: 'success'})
            }else{
                await res.status(500).json({result: "error"})
            }
        })

})

//route to login a user
router.get("/login",(req,res)=>{
    db.query("select count(votecode) as result from users where id=?",[req.body.id],async (err,rows,field)=>{
        if (err) throw err;
        await res.json(rows).status(201)
    })
})

//route to delete one user 
router.delete("/:id",(req,res)=>{
    db.query("delete from users where id=?",[req.body.id],(err,rows,fields)=>{
        if(err) throw err;
        console.log(rows)
        res.json(rows)
    })
})

module.exports = router
