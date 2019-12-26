const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the bucky api!!!!');
});

app.listen('80', () => {
    console.log('Welcome to the Bucky API, youn are listening on PORT 80');
})