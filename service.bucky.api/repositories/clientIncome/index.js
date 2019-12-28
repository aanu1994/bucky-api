const dbconnect = require('../dbconnect');
const con = dbconnect.connection;

/**
 * Add client salary by client id.
 * @param number clientId 
 * @param {*} callback 
 */
const addClientSalary = (clientId, salary, callback) => {
    con.query("INSERT INTO clientIncome (clientId, salary, date) VALUES (?, ?, CURDATE());", [clientId, salary], (err, results) => {
        if (err) {
            callback(err, null);
        }
        callback(null, true);
    });
};

const getClientSalary = (clientId, callback) => {
    con.query("SELECT salary FROM clientIncome WHERE clientId = ? ORDER BY date DESC LIMIT 1;", [clientId], (err, results) => {
        if (err) {
            callback(err, null);
        }
        callback(null, results[0].salary);
    });
};

exports = module.exports = { addClientSalary, getClientSalary };