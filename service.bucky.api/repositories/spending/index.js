const dbconnect = require('../dbconnect');
const con = dbconnect.connection;

/**
 * Fetch client record by client id.
 * @param number clientId 
 * @param {*} callback 
 */
const addClientSpending = (clientId, spendingData, callback) => {
    con.query("INSERT INTO spending (clientId, amount, date) VALUES (?, ?, ?);", [clientId, spendingData.amount, spendingData.date], (err, results) => {
        if (err) throw err;
        callback(null, true);
    });
};

const getClientSpending = (clientId, fromDate, toDate, callback) => {
    con.query("SELECT SUM(amount) as total FROM spending WHERE clientId = ? AND (date BETWEEN ? AND ?);", [clientId, fromDate, toDate], (err, results) => {
        if (err) throw err;
        callback(null, results[0].total);
    });
};

exports = module.exports = { addClientSpending, getClientSpending };