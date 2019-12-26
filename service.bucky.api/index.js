const express = require('express');
const clientService = require('./repositories/client');
const dbConnect = require('./repositories/dbconnect')
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the bucky api!!!!');
});

app.get('/health', (req, res) => {
    res.send(dbConnect.pingDb());
});

app.post('/clients', (req, res) => {    
    clientService.create(req.body);

    res.status(200).send(JSON.stringify({
        "result": {
            "status": "success",
            "detail": "Client Successfuly Created"
        }
    }));
});

app.listen(process.env.PORT, () => {
    console.log(`Welcome to the Bucky API, you are listening on port: ${process.env.PORT}`);
});

