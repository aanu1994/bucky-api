const express = require('express');
const clientService = require('./repositories/client');
const dbConnect = require('./repositories/dbconnect')
const app = express();

app.use(express.json());

/**
 * Console the HTTP Method, URL called and Request Body sent upon each call being made.
 */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

/**
 * GET. Base endpoint of API, return general welcome message.
 */
app.get('/', (req, res) => {
    res.send('Welcome to the bucky api!!!!');
});

/**
 * GET. Health of API in regards to its donnection to the DB.
 */
app.get('/health', (req, res) => {
    res.send(dbConnect.pingDb());
});

/**
 * POST. Provide request payload to create client with provided data.
 */
app.post('/clients', (req, res) => {    
    clientService.create(req.body);

    res.status(200).send(JSON.stringify({
        "result": {
            "status": "success",
            "detail": "Client Successfuly Created"
        }
    }));
});

/**
 * GET. Get client details by the client id.
 */
app.get('/clients/:clientId', (req, res) => {
    clientService.fetchClientById(req.params.clientId, (err, data) => {
        if (data === undefined) {
            res.status(404).send(
                {
                    "result": `Client with id ${req.params.clientId} does not exist`
                }
            );
        }
        res.send(data);
    });
});

/**
 * Use the PORT provided from the environment variable to dictate the port that should
 * be listened to.
 */
app.listen(process.env.PORT, () => {
    console.log(`Welcome to the Bucky API, you are listening on port: ${process.env.PORT}`);
});
