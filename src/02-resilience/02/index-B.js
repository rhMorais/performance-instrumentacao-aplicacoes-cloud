const express = require('express');
const { default: got } = require('got/dist/source');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3101;
const host = process.env.HOSTNAME  || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

async function requestApi (maxRetryCount = 1) {
    const urlApi = 'http://localhost:3100';
    return got(urlApi, { retry: maxRetryCount });
}

app.get('/retry', async (req, res) => {
    try{
        await requestApi();
        res.send('OK');
    }catch(err){
        res.status(500).send('Erro na chamada da api A');
    }
});

app.listen(port, () => {
    console.log(`App listening on url ${url}`);
});