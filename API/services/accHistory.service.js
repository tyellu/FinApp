var CronJob = require('cron').CronJob;
import Portfolio from '../models/portfolio.model';
import accHistory from '../models/accHistory.model';
import Stock from '../models/stock.model';
import AlphaIntegration from '../Integration/AlphaIntegration';

var accHist = new CronJob('59 59 23 * * 0-6', function() {
    Portfolio.find({}, (err,portfolios) => {
        portfolios.forEach((p) => {
            let marketValue = Number(p.balance);
            Stock.find({_id: {'$in': p.stocks}}, (err, stockList) => {
                if (err) return res.json(err);
                const symbolList = stockList.map((stockItem) => {
                    return stockItem.symbol;
                });
                AlphaIntegration.getBatch(symbolList, (quotes) => {
                    stockList.map((stockItem) => {
                        const stockQuote = quotes.find((quote) => {
                            return quote.symbol === stockItem.symbol;
                        });
                        marketValue += stockItem.quantity * Number(stockQuote.price);
                    });
                    accHistory.findOneAndUpdate(
                        {email: p.email},
                        {
                            $setOnInsert : {email: p.email},
                            $push : { history: {
                                accValue : Number(marketValue),
                                date: new Date()
                            }}
                        },
                        {safe: true, new: true, upsert: true},
                        function (err, acc){
                            if(err) console.log(err);
                            if(acc) console.log("account " + acc.email + " preserved");
                        }
                    );
                });
            })


        });
    });
}, function(){console.log("accounts store");}, false, 'America/Toronto');


export default accHist;