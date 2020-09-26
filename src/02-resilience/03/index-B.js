const express = require('express');
const { default: got } = require('got/dist/source');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3101;
const host = process.env.HOSTNAME  || 'localhost';
const url = `http://${host}:${port}`;
const CircuitBreaker = require('opossum');

const circuitBreakerOptions = {
    timeout: 5000,
    errorThresholdPercentage: 10,
    resetTimeout: 10000
};

const breaker = new CircuitBreaker(requestApi, circuitBreakerOptions);
breaker.on('open', () => console.log(`OPEN: The breaker`));
breaker.on('halfOpen', () => console.log(`HALF_OPEN: The breaker`));
breaker.on('close', () => console.log(`CLOSE: The breaker`));
breaker.fallback(() => console.log('called fallback'));

app.use(express.json());

async function requestApi (maxRetryCount = 1) {
    const urlApi = 'http://localhost:3100';
    return got(urlApi, { retry: maxRetryCount });
}

async function requestBB () {
    return breaker.fire();
}

app.get('/circuitbreaker', async (req, res) => {
    try {
        await requestBB();
        res.send('OK');
    } catch(err){
        res.status(500).send('Erro na chamada da api A');
    }
});

app.listen(port, () => {
    console.log(`App listening on url ${url}`);
});