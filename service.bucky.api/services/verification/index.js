const clientService = require('../../repositories/client');

const verifyClient = (clientId, callback) => {
    clientService.fetchClientById(clientId, (err, data) => {
        if (data === undefined) {
            callback(err, false);
        }
        callback(null, true);
    });
}

exports = module.exports = { verifyClient };