const https = require('https');
const config = require('../config/config');


function getOne (scale, symbol, interval, callback) {
    interval = interval || '1min';
    var params = `/query?function=${scale}&symbol=${symbol}&interval=${interval}`;
    request(params, callback);
}

function getBatch(symbols, callback) {
    var params = `/query?function=BATCH_STOCK_QUOTES&symbols=${symbols.join()}&apikey=${config.AlphaKey}`;
    request(params, (res) => {
        callback(res.quotes);
    });
}

function request(params, callback) {
    const options = {
        host: 'www.alphavantage.co',
        port: 443,
        path: params,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        res.setEncoding('utf-8');
        res.on('data', (data) => {
            // fix some ugly naming from AlphaVantage
            data = JSON.parse(cleanResponse(data));
            callback(data);
        });
    });

    req.on('error', (err) => {
        console.log(err);
    });

    req.end();
}


function getCurrentPrice(symbol, callback) {
    getBatch([symbol], (res) => {
        if (!res || res.length === 0) {
            console.log("failed to retrieve quote");
            callback(null);
        } else {
            callback(Number(res[0].price));
        }
    })
}

function cleanResponse(response) {
    return response.replace(/1. symbol/g, "symbol")
        .replace(/2. price/g, "price")
        .replace(/3. volume/g, "volume")
        .replace(/4. timestamp/g, "timestamp")
        .replace(/Stock Quotes/g, "quotes")

        .replace(/1. open/g, "open")
        .replace(/2. high/g, "high")
        .replace(/3. low/g, "low")
        .replace(/4. close/g, "close")
        .replace(/5. volume/g, "volume");
}

module.exports = { getOne, getBatch, getCurrentPrice};