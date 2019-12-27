const express = require('express');
const clientService = require('./repositories/client');
const spendingService = require('./repositories/spending');
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

app.post('/clients/spending/:clientId', (req, res) => {

    clientService.fetchClientById(req.params.clientId, (err, data) => {
        if (data === undefined) {
            return res.status(404).send(
                {
                    "result": `Client ${req.params.clientId} does not exist.`
                }
            );
        }

        spendingService.addClientSpending(req.params.clientId, req.body, (err, data) => {
            if (data === true) {
                return res.send(
                    {
                        "result": "spending data successfully submitted."
                    }
                );
            }
    
            return res.send(
                {
                    "result": `Spending data unable to be submitted for client ${req.param.clientId}.`
                }
            );
        });
    });
});

app.get('/score/:clientId', (req, res) => {
    /**
     * This is where I would obtain the spending data based on the time range provided within the 
     * request body.
     */

     /**
      * With the response from above I would then pass it into the score calculator service
      */

      /**
       * The service would provide the bucky for that user within the given time range based on the data we have on them
       */

       /**
        * Updates to the clients information can be made and another score requested
        */
});

/**
 * Use the PORT provided from the environment variable to dictate the port that should
 * be listened to.
 */
app.listen(process.env.PORT, () => {
    console.log(`Welcome to the Bucky API, you are listening on port: ${process.env.PORT}`);
});
