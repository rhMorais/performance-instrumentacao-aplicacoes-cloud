const express = require('express');
const app = express();
const port = process.env.PORT || 3100;
const host = process.env.HOSTNAME  || 'localhost';
const url = `http://${host}:${port}`;
const newrelic = require('newrelic');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('OK');        
});

app.get('/error', (req, res) => {
    res.status(500).send('Erro na api');
})

app.listen(port, () => {
    console.log(`App listening on url ${url}`);
});