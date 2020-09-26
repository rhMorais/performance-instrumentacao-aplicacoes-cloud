process.env.APP_NAME = "index-A";
const express = require('express');
const log = require('./log');
const app = express();
const port = process.env.PORT || 3100;
const host = process.env.HOSTNAME  || 'localhost';
const url = `http://${host}:${port}`;
const newrelic = require('newrelic');

app.use(express.json());

app.get('/', (req, res) => {
    log.info('OK');
    res.send('OK');        
});

app.get('/error', (req, res) => {
    log.error('Something broke!');
    res.status(500).send('Erro na api');
})

app.listen(port, () => {
    console.log(`App listening on url ${url}`);
});