db = require("../connection.js")
const router = require("express").Router()

//route to get all notifications
router.get("/", (req, res) => {
    db.query("select *, time(date) as t from notifications", async (err, rows, field) => {
        if (err) throw err;
        console.log(rows)
        await res.json(rows).status(200)
    })
})

//gettings all unread notifications
router.get("/unread", (req, res) => {
    let num = parseInt(req.params.num)
    db.query("select * from notifications where status=?", ["unread"], async (err, rows, field) => {
        if (err) throw err;
        await res.json(rows).status(200)
    })
})

//route to add a new notification
router.post("/", (req, res) => {
    db.query("insert into notifications(message,icon) values(?,?)", [req.body.message, req.body.icon], async (err, rows, field) => {
        if (!err == null) {
            await res.json({
                result: 'notifications added successfully !!!'
            }).status(201)
        } else {
            res.json({
                error: 'An error occured try again !!!'
            }).status(500)
        }
    })
})

//route to delete a notification
router.delete("/:id", (req, res) => {
    db.query("delete from notifications where id=?", [req.params.id], async (err, rows, field) => {
        if (!err == null) {
            await res.json({
                result: 'notifications deleted successfully !!!'
            }).status(201)
        } else {
            res.json({
                error: 'An error occured try again !!!'
            }).status(500)
        }
    })
})

module.exports = router