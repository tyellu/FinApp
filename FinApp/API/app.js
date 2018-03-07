const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const PORT = 3000;

app.use(bodyParser.json());

// ========= Routing ===========
var router = express.Router();
const authRoutes = require('./auth/auth.route');

router.use('/auth', authRoutes);
// .... add more routes here


app.use('/api', router);
// ========= Routing End ===========

// TODO: Security Measures

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
