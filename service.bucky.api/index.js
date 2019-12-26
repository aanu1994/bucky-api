const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to the bucky api!!!!');
});

app.listen(process.env.PORT, () => {
    console.log(`Welcome to the Bucky API, youn are listening on port: ${process.env.PORT}`);
});

