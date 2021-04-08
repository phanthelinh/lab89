const express = require('express');

const router = require('./src/router');
const db = require('./src/model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.get('/', (req, res) => {
    res.end();
})

app.listen(8080, () => {
    console.log('Server started.');
})