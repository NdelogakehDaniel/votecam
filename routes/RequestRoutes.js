db = require("../connection.js")
const router = require("express").Router()
const ImageDataURI = require('image-data-uri');


//route to upload images
router.get("/upload",(req,res)=>{
    let dataURI = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540daniel-ndabose%252Fvotecam/ImagePicker/25b303ce-8987-4e9c-80b3-d4706fca5b6e.jpg"
    let image2 = req.body.image2

    const filePath = '../fileUploads/decoded-image.jpg';

    ImageDataURI.outputFile(dataURI, filePath);
    res.json({result: 'success'}).status(200)
})


//route to get all request
router.get("/",(req,res)=>{
    db.query("select * from request",(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows).status(200)
    })
})

//route to add a request
router.post("/",(req,res)=>{
    db.query("insert into request (image,request_code) values (?,?)",[req.body.image,req.body.request_code],(err,rows,fields)=>{
        if(err){
            res.json({result:'error'})
        }else{
            res.json({result:'success'})
        }
    })
})

//route to get all requests that haven't been read
router.get("/unviewed",(req,res)=>{
    db.query("select * from request where view=?",[0],(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows).status(200)
    })
})

//route to delete a request 
router.delete("/:id",(req,res)=>{
    db.query("delete from request where id=?",[req.params.id],(err,rows,fields)=>{
        if(err){
            res.json({result:'error'})
        }else{
            res.json({result:'success'})
        }
    })
})

//route to search for a particular request by it's request code
router.get("/:code",(req,res)=>{
    db.query("select * from request where request_code=?",[req.params.code],(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows).status(200)
    })
})

module.exports = router