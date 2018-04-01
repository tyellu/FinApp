const https = require('https');
const config = require('../config/config');

function getNews (callback) {
    let params = `/v2/top-headlines?sources=cnbc&apiKey=${config.NewsKey}`;
    request(params, (res) => {
        callback(res);
    });
}

function request(params, callback) {
    const options = {
        host: 'newsapi.org',
        port: 443,
        path: params,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        var body = '';
        res.setEncoding('utf-8');
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (data) => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);
            callback(body);
        })
    });

    req.on('error', (err) => {
        console.log(err);
    });

    req.end();
}

module.exports = { getNews };