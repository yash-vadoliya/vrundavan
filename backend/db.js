const mysql = require('mysql2');

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "vrundavan",
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0
});

con.query('SELECT 1', (err, results) => {
    if(err){
        console.log("Error to Connect Darabase",err);
    } else {
        console.log("Database Connect Successfully..");
    }
});

module.exports = con.promise();