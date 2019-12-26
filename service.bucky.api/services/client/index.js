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

const createClientQuery = "INSERT INTO clients (firstname, lastname, dob, address1, address2, city, postcode, country, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

const createClientPrepareFields = (body) => {
    return [body.firstname, body.lastname, body.dob, body.address.address1, body.address.address2, body.address.city, body.address.postcode, body.address.country, body.email];
};

const create = (body) => {
    con.query(createClientQuery, createClientPrepareFields(body), 
        (err, results) => {
        if (err) throw err;
        
        return JSON.stringify({
            "result": {
                "status": "success",
                "detail": "Client Successfuly Created"
            }
        });
    });
};

const pingDb = () => {
    con.query("SELECT 1;", (err, results) => {
        if (err) throw err;
        console.log(`Connection Healthy`);
    });
};

exports = module.exports = { create };