const mysql = require('mysql')

let connection = mysql.createConnection({
    host : '192.168.15.137',
    user : 'masood',    
    password : 'welcome',
    database:'test',


});



module.exports = connection;