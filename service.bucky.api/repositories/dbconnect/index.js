//This repository has been abstracted in order for all of the other 
//repositories to be able to utilize the same connection.
//Saves having to "reinstantiate" a new and exact connection within each repo.

const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.BUCKY_DB_HOST,
    user: process.env.BUCKY_DB_USER,
    password: process.env.BUCKY_DB_PASSWORD,
    database: process.env.BUCKY_DB_DATABASE
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

const pingDb = () => {
    con.query("SELECT 1;", (err, results) => {
        if (err) throw err;
        console.log(`Connection Successful!`);
    });
};

const dbConnect = con;

exports = module.exports = { dbConnect, pingDb };