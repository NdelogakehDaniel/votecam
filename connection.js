const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host:'localhost',
    database:'voteapp',
    user:'root',
    password:''
})

module.exports = dbConn;