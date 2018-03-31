const config = require('./config/config.js');
const app = require('./config/app.js');
const AlphaBatch = require('./Integration/AlphaBatch');

const http = require('http');

if (!module.parent) {
    // listen on port config.port
    http.createServer(app).listen(config.port, function (err) {
        if (err) console.log(err);
        else console.log("HTTP server on http://localhost:%s", config.port);
    });
}

module.exports = app;