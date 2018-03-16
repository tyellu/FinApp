const https = require('https');
const config = require('../config/config');


function getOne (scale, symbol, interval, callback) {
    interval = interval || '1min';
    var params = `/query?function=${scale}&symbol=${symbol}&interval=${interval}`;
    request(params, callback);
}

function getBatch(symbols, callback) {
    var params = `/query?function=BATCH_STOCK_QUOTES&symbols=${symbols.join()}&apikey=${config.AlphaKey}`;
    request(params, callback);
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
            // fix some ugly json naming from AlphaVantage
            data = data
                .replace(/1. symbol/g, "symbol")
                .replace(/2. price/g, "price")
                .replace(/3. volume/g, "volume")
                .replace(/4. timestamp/g, "timestamp")
                .replace(/Stock Quotes/g, "quotes")

                .replace(/1. open/g, "open")
                .replace(/2. high/g, "high")
                .replace(/3. low/g, "low")
                .replace(/4. close/g, "close")
                .replace(/5. volume/g, "volume");
            data = JSON.parse(data);
            callback(data.quotes);
        });
    });

    req.on('error', (err) => {
        console.log(err);
    });

    req.end();
}

module.exports = { getOne, getBatch };