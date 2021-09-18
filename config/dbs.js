const mysql= require('mysql2');

var mysqlConnection = mysql.createConnection({
    host:'sql6.freemysqlhosting.net',
    user:'sql6436529',
    password:'gWGKSPqH2c',
    database:'sql6436529',
    port:3306
});

 mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB Connection succeeded")
    }else{
        console.log("DB Connection failed")
    }
})
module.exports = mysqlConnection;