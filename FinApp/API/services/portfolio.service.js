import Portfolio from '../models/portfolio.model';
import Stock from '../models/stock.model';
import AlphaIntegration from '../Integration/AlphaIntegration';

function createPortfolio(req, res, next) {
    Portfolio.create(req.body, function(err, portfolio){
        res.json(portfolio);
    });
}

function getPortfolio(req, res, next){
    //console.log("==== GET PORTFOLIO ========");
    //console.log(req.user);
    Portfolio.findOne({email: req.user.email}, function(err, portfolio){
        // retrieve the details of all stocks in portfolio
        Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
            if (err) return res.json(err);
            const symbolList = stockList.map((stockItem) => { return stockItem.symbol});
            AlphaIntegration.getBatch(symbolList, (quotes) => {
                const modifiedStockList = stockList.map((stockItem) => {
                    const stockQuote = quotes.find((quote) => { return quote.symbol === stockItem.symbol });
                    return {
                        _id: stockItem._id.toString(),
                        boughtPrice: stockItem.price,
                        currentPrice: Number(stockQuote.price),
                        quantity: stockItem.quantity,
                        symbol: stockItem.symbol
                    };
                });
                res.json({
                    _id: portfolio._id.toString(),
                    email: portfolio.email,
                    balance: portfolio.balance,
                    stocks: modifiedStockList
                });
            });
        });
    });
}

function addToPortfolio(req, res, next){
    //console.log("==== ADD PORTFOLIO ========");
    //console.log(req.user);
    AlphaIntegration.getCurrentPrice(req.body.symbol, currentPrice => {
        Portfolio.findOne({email: req.user.email}, function(err, portfolio){
            //TODO find which status code to return for insufficient funds and return the error
            // retrieve the details of all stocks in portfolio
            Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                let contained = false;
                let stock = stockList.find((stockItem) => { return stockItem.symbol === req.body.symbol });
                if (!stock) {
                    stock = new Stock({
                        symbol: req.body.symbol,
                        quantity: req.body.quantity,
                        price: currentPrice
                    });
                } else {
                    contained = true;
                    // new price will be weighted average
                    stock.price = ((stock.price * stock.quantity) + (req.body.quantity * currentPrice)) / (stock.quantity + req.body.quantity);
                    stock.quantity += req.body.quantity;
                }

                stock.save()
                    .then((updatedStock) => {
                        if (!contained)
                            portfolio.stocks.push(updatedStock._id);
                        portfolio.balance -= (req.body.quantity * currentPrice);
                        portfolio.save()
                            .then((updatedPortfolio) => {
                                res.json(updatedPortfolio);
                            })
                            .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
            });
        });
    });
}

function removeFromPortfolio(req, res, next) {
    //console.log("==== RM PORTFOLIO ========");
    //console.log(req.user);
    AlphaIntegration.getCurrentPrice(req.body.symbol, (currentPrice) => {
        Portfolio.findOne({email: req.user.email}, function(err, portfolio){
            //TODO find which status code to return for insufficient funds and return the error
            // retrieve the details of all stocks in portfolio
            Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                let stock = stockList.find((stockItem) => { return stockItem.symbol === req.body.symbol});
                if (!stock) res.status(500).end("stock not in portfolio");
                if (stock.quantity < req.body.quantity) res.status(500).end("invalid quantity");

                stock.quantity -= req.body.quantity;

                if (!stock.quantity) {
                    stock.remove()
                        .then(() => {
                        portfolio.stocks = portfolio.stocks.filter((stockId) => { return stockId !== stock._id });
                        portfolio.balance += (req.body.quantity * currentPrice);
                        portfolio.save()
                            .then((updatedPortfolio) => {
                                res.json(updatedPortfolio);
                            }).catch((err) => next(err));
                    }).catch((err) => next(err));
                } else {
                    stock.save()
                        .then((updatedStock) => {
                            portfolio.balance += (req.body.quantity * currentPrice);
                            portfolio.save()
                                .then((updatedPortfolio) => {
                                    res.json(updatedPortfolio);
                                }).catch((err) => next(err));
                        }).catch((err) => next(err));
                }
            });
        });
    });
}

export default { getPortfolio, addToPortfolio, createPortfolio, removeFromPortfolio};