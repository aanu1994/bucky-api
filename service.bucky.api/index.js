const express = require('express');
const app = express();
const dbConnect = require('./repositories/dbconnect');
const clientService = require('./repositories/client');
const clientIncomeService = require('./repositories/clientIncome');
const spendingService = require('./repositories/spending');
const scoreService = require('./services/score');


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

    res.status(200).send(
        {
            "result": {
                "status": "success",
                "detail": "Client Successfuly Created"
            }
        });
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

            return res.status(500).send(
                {
                    "result": `Spending data unable to be submitted for client ${req.param.clientId}.`
                }
            );
        });
    });
});

app.post('/clients/salary/:clientId', (req, res) => {
    clientService.fetchClientById(req.params.clientId, (err, data) => {
        if (data === undefined) {
            return res.status(404).send(
                {
                    "result": `Client ${req.params.clientId} does not exist.`
                }
            );
        }

        if (req.body.salary === undefined) {
            return res.status(400).send(
                {
                    "result": 'No Salary Provided.'
                }
            );
        }

        clientIncomeService.addClientSalary(req.params.clientId, req.body.salary, (err, data) => {
            if (data === true) {
                return res.send(
                    {
                        "result": "Salary Added."
                    }
                );
            }
        });
    });
});

app.get('/score/:clientId/:fromDate/:toDate/:period', (req, res) => {
    clientService.fetchClientById(req.params.clientId, (err, clientData) => {
        if (clientData === undefined) {
            return res.status(404).send(
                {
                    "result": `Client ${req.params.clientId} does not exist.`
                }
            );
        }

        spendingService.getClientSpending(req.params.clientId, req.params.fromDate, req.params.toDate, (err, spend) => {
            if (spend === undefined) {
                return res.status(400).send(
                    {
                        "result": `Client ${req.params.clientId}: No spending data found.`
                    }
                );
            }

            clientIncomeService.getClientSalary(req.params.clientId, (err, salary) => {
                if (salary === undefined) {
                    return res.status(404).send(
                        {
                            "result": `No salary found for client ${req.params.clientId}.`
                        }
                    );
                }

                clientData.spend = spend;
                clientData.salary = salary;

                const score = scoreService.getBuckyScore(clientData, req.params.period);
                return res.send(
                    {
                        "clientId": req.params.clientId,
                        "score": score,
                        "period": req.params.period,
                        "date_from": req.params.fromDate,
                        "date_to": req.params.toDate
                    }
                );
            });
        });
    });
});

/**
 * Use the PORT provided from the environment variable to dictate the port that should
 * be listened to.
 */
app.listen(process.env.PORT, () => {
    console.log(`Welcome to the Bucky API, you are listening on port: ${process.env.PORT}`);
});
