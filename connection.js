const mysql = require('mysql')

// const dbConn = mysql.createConnection({
//     host:'localhost',
//     database:'voteapp',
//     user:'root',
//     password:''
// })

const dbConn = mysql.createConnection("mysql://b3f73dee5a53e7:d146d8d9@us-cdbr-east-05.cleardb.net/heroku_1233b7754a473f4?reconnect=true")
s
module.exports = dbConn;