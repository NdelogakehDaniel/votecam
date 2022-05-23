const db = require('../connection.js')
const router = require('express').Router()

//route to get one users
router.get("/:id",(req,res)=>{
    db.query("select * from admin where id=?",[req.params.id],async (err,rows,fields)=>{
        if(err) throw err;
        await res.status(200).json(rows)
    })
})

//route to get all users
router.get("/",(req,res)=>{
    db.query("select * from admin",async (err,rows,fields)=>{
        if(err) throw err;
        res.status(200).json(rows)
    })
})


//route to add a user
router.post("/add",(req,res)=>{
    let isOkay = false;
    db.query("select count(id) as result from admin where id=?",[req.body.id],async (err,rows,field)=>{
        if (err) throw err;
        if(rows[0].result<=0){
            isOkay = true
        }
    })
    
    if(isOkay){
        db.query("insert into admin(name,email,tel) values(?,?,?)",
        [req.body.name,req.body.email,req.body.tel],
        async (err,rows,fields)=>{
            if(err==null){
                await res.status(201).json({result: 'success'})
            }else{
                await res.status(500).json({result: err})
            }
        })
    }
})

//route to delete one user 
router.delete("/:id",(req,res)=>{
    db.query("delete from admin where id=?",[req.body.id],(err,rows,fields)=>{
        if(err) throw err;
        console.log(rows)
        res.json(rows)
    })
})

module.exports = router
