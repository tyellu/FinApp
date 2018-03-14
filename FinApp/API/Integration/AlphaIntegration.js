const https = require('https');
var alphaService = {};

alphaService.getOne = function(scale, symbol, callback) {
    var params = `/query?function=${scale}&symbol=${symbol}`;
    request(params, callback);
};

alphaService.getBatch = function(symbols, callback) {
    var params = `/query?function=BATCH_STOCK_QUOTES&symbols=${symbols.join()}`;
    request(params, callback);
};

function request(params, callback) {
    var options = {
        host: 'https://www.alphavantage.co/',
        port: 443,
        path: params,
        method: 'GET'
    };
    https.request(options, function(res) {
        console.log('=========================');
        console.log('HTTPS Request: ' + options.host + options.params);
        console.log('Response: ' + res.status);
        console.log(res.body);
    });
}

module.exports = alphaService;