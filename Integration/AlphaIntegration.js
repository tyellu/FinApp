const https = require('https');
const config = require('../config/config');
const moment = require('moment');

function getOne (symbol, scale, callback) {
    let params, start, end, data, format;
    switch (scale){
        case "DAILY":
            params = `/query?function=TIME_SERIES_INTRADAY&symbol=${symbol.trim()}&interval=5min&outputsize=compact&apikey=${config.AlphaKey}`;
            break;
        case "MONTHLY":
            params = `/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol.trim()}&outputsize=compact&apikey=${config.AlphaKey}`;
            break;
        case "YEARLY":
            params = `/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol.trim()}&apikey=${config.AlphaKey}`;
            break;
        default:
            params = `/query?function=TIME_SERIES_INTRADAY&symbol=${symbol.trim()}&interval=15min&outputsize=compact&apikey=${config.AlphaKey}`;
            break;
    }

    request(params, (res) => {
        switch (scale){
            case "DAILY":
                //console.log(moment().isBefore(moment().hour(9).startOf('hour')));
                if (moment().day() === moment().day("Sunday").day())
                    start = moment().subtract(2, 'day').startOf('day');
                else if (moment().day() === moment().day("Saturday").day())
                    start = moment().subtract(1, 'day').startOf('day');
                else if (moment().isBefore(moment().hour(9).startOf('hour')))
                    start = moment().subtract(1, 'day').startOf('day');
                else
                    start = moment().startOf('day');

                end = start.clone().endOf('day');
                data = res["Time Series (5min)"];
                format = "YYYY-MM-DD HH:mm:ss";
                callback(filterResults(start, end, data, format));
                break;
            case "MONTHLY":
                start = moment().subtract(1, 'months');
                end = moment().endOf('day');
                data = res["Time Series (Daily)"];
                format = "YYYY-MM-DD";
                callback(filterResults(start, end, data, format));
                break;
            case "YEARLY":
                start = moment().subtract(1, 'years');
                end = moment().endOf('day');
                data = res["Monthly Adjusted Time Series"];
                format = "YYYY-MM-DD";
                callback(filterResults(start, end, data, format));
                break;
            default:
                start = moment().startOf('day');
                end = moment().endOf('day');
                data = res["Time Series (5min)"];
                format = "YYYY-MM-DD HH:mm:ss";
                callback(filterResults(start, end, data, format));
        }
    });
}

function getBatch(symbols, callback) {
    let params = `/query?function=BATCH_STOCK_QUOTES&symbols=${symbols.join().trim()}&apikey=${config.AlphaKey}`;
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
        var body = '';
        res.setEncoding('utf-8');
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);
        res.on('data', (data) => {
            body += data;
        });
        res.on('end', () => {
            // fix some ugly naming from AlphaVantage
            //console.log(body.toString());
            body = JSON.parse(cleanResponse(body));
            callback(body);
        })
    });

    req.on('error', (err) => {
        console.log(err);
    });

    req.end();
}



function getCurrentPrice(symbol, callback) {
    getBatch([symbol], (res) => {
        if (!res || res.length === 0) {
            console.log("Failed to retrieve quote: " + symbol);
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
        .replace(/Time Series (Daily)/g, "quotes")
        .replace(/Time Series (15min)/g, "quotes")
        .replace(/Monthly Time Series/g, "quotes")
        .replace(/5. adjusted close/g, "adjustedClose")
        .replace(/6. volume/g, "volume")
        .replace(/7. dividend amount/g, "dividendAmount")
        .replace(/8. split coefficient/g, "splitCoefficient")


        .replace(/1. open/g, "open")
        .replace(/2. high/g, "high")
        .replace(/3. low/g, "low")
        .replace(/4. close/g, "close")
        .replace(/5. volume/g, "volume");
}


function filterResults(startDate, endDate, data, format) {
    if (data) {
        return Object.keys(data).filter((key) => {
            let dataDate = moment(key, format);
            return dataDate.isAfter(startDate) && dataDate.isBefore(endDate);
        }).reduce((reducedData, key) => {
            reducedData[key] = data[key];
            return reducedData;
        }, {});
    } else {
        return data;
    }


}

module.exports = { getOne, getBatch, getCurrentPrice};