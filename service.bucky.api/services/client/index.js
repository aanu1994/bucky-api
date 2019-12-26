const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.BUCKY_DB_HOST,
    user: process.env.BUCKY_DB_USER,
    password: process.env.BUCKY_DB_PASSWORD
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

const create = (req) => {
    con.query("SELECT 1;", (err, results) => {
        if (err) throw err;
        
        console.log(`Query Results: ${results[0].Database}`);
    });
};

const pingDb = () => {
    con.query("SELECT 1;", (err, results) => {
        if (err) throw err;
        console.log(`Connection Healthy`);
    });
};


exports = module.exports = { create };