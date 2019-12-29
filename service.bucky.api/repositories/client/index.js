//Repository for client related calls. Importing and using connection from dbconnect.
const dbconnect = require('../dbconnect');
const con = dbconnect.connection;

/**
 * Create client query.
 */
const createClientQuery = "INSERT INTO clients (firstname, lastname, dob, address1, address2, city, postcode, country, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

/**
 * Prepared statement values for the create client statement.
 * @param {*} body 
 */
const createClientPrepareFields = (body) => {
    return [body.firstname, body.lastname, body.dob, body.address.address1, body.address.address2, body.address.city, body.address.postcode, body.address.country, body.email];
};

/**
 * Create method to take in request body containing client information
 * required to create a bucky client.
 * @param {*} body 
 */
const create = (body) => {
    con.query(createClientQuery, createClientPrepareFields(body),
        (err, results) => {
            if (err) throw err;
        });
};

/**
 * Fetch client record by client id.
 * @param number clientId 
 * @param {*} callback 
 */
const fetchClientById = (clientId, callback) => {
    con.query("SELECT firstname, lastname, DATE_FORMAT(dob,'%Y-%m-%d') as dob FROM clients WHERE id = ?;", [clientId], (err, results) => {
        if (err) {
            callback(err, null);
        }
        callback(null, results[0]);
    });
};

const duplicateEmail = (email, callback) => {
    con.query("SELECT COUNT(*) as count FROM clients WHERE email = ? ;", [email], (err, results) => {
        if (err) {
            callback(err, null);
        }

        callback(null, results[0].count > 0);
    });
};

exports = module.exports = { create, fetchClientById, duplicateEmail };