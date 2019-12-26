const dbconnect = require('../dbconnect');
const con = dbconnect.dbConnect;

const createClientQuery = "INSERT INTO clients (firstname, lastname, dob, address1, address2, city, postcode, country, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

const createClientPrepareFields = (body) => {
    return [body.firstname, body.lastname, body.dob, body.address.address1, body.address.address2, body.address.city, body.address.postcode, body.address.country, body.email];
};

const create = (body) => {
    con.query(createClientQuery, createClientPrepareFields(body), 
        (err, results) => {
        if (err) throw err;
    });
};

exports = module.exports = { create };