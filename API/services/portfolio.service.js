import Portfolio from '../models/portfolio.model';
import Stock from '../models/stock.model';
import Transaction from '../models/transactions.model';
import AlphaIntegration from '../Integration/AlphaIntegration';
import NewsIntegration from '../Integration/NewsIntegration';

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
            const symbolList = stockList.map((stockItem) => { return stockItem.symbol;});
            AlphaIntegration.getBatch(symbolList, (quotes) => {
                const modifiedStockList = stockList.map((stockItem) => {
                    const stockQuote = quotes.find((quote) => { return quote.symbol === stockItem.symbol;});
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

function getTransactions(req, res, next){
    console.log("==== GET Transactions ========");
    console.log(req.user);
    Transaction.find({email: req.user.email}, function(err, transactions){
        res.json(transactions);
    });
}

function makeNewTransaction(req, res, next){
    console.log("==== Add New Transaction to Queue ========");
    console.log(req.user);
    Transaction.create({email:req.user.email, symbol:req.body.symbol, quantity:req.body.quantity, type:req.body.type}, function(err, transaction){
        //applyNextTransaction(res);
        res.json("Added transaction to queue");
    });
}

function addToPortfolio(transaction){
    console.log("==== ADD PORTFOLIO ========");
    AlphaIntegration.getCurrentPrice(transaction.symbol, currentPrice => {
        Portfolio.findOne({email: transaction.email}, function(err, portfolio){
            //TODO find which status code to return for insufficient funds and return the error
            // retrieve the details of all stocks in portfolio
            Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                var contained = false;
                var stock = stockList.find((stockItem) => { return stockItem.symbol === transaction.symbol });
                if (!stock) {
                    stock = new Stock({
                        symbol: transaction.symbol,
                        quantity: transaction.quantity,
                        price: currentPrice
                    });
                } else {
                    contained = true;
                    // new price will be weighted average
                    stock.price = ((stock.price * stock.quantity) + (transaction.quantity * currentPrice)) / (stock.quantity + transaction.quantity);
                    stock.quantity += transaction.quantity;
                }
                stock.save()
                    .then((updatedStock) => {
                        if (!contained)
                            portfolio.stocks.push(updatedStock._id);
                        portfolio.balance -= (transaction.quantity * currentPrice);
                        portfolio.save()
                            /*.then((updatedPortfolio) => {
                                res.json(updatedPortfolio);
                            })*/
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            });
        });
    });
}


function removeFromPortfolio(transaction) {
    console.log("==== RM PORTFOLIO ========");
    AlphaIntegration.getCurrentPrice(transaction.symbol, (currentPrice) => {
        Portfolio.findOne({email: transaction.email}, function(err, portfolio){
            //TODO find which status code to return for insufficient funds and return the error
            // retrieve the details of all stocks in portfolio
            Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                var stock = stockList.find((stockItem) => { return stockItem.symbol === transaction.symbol});
                if (stock) //res.status(500).end("stock not in portfolio");
                {
                    if (stock.quantity >= transaction.quantity) //res.status(500).end("invalid quantity");
                    {
                        stock.quantity -= transaction.quantity;

                        if (!stock.quantity) {
                            stock.remove()
                                .then(() => {
                                portfolio.stocks = portfolio.stocks.filter((stockId) => { return stockId !== stock._id });
                                portfolio.balance += (transaction.quantity * currentPrice);
                                portfolio.save()
                                    /*.then((updatedPortfolio) => {
                                        res.json(updatedPortfolio);
                                    })*/.catch((err) => console.log(err));
                            }).catch((err) => console.log(err));
                        } else {
                            stock.save()
                                .then((updatedStock) => {
                                    portfolio.balance += (transaction.quantity * currentPrice);
                                    portfolio.save()
                                        /*.then((updatedPortfolio) => {
                                            res.json(updatedPortfolio);
                                        })*/.catch((err) => console.log(err));
                                }).catch((err) => console.log(err));
                        }
                    }
                }
            });
        });
    });
}

function getNews(req, res, next){
    NewsIntegration.getNews((news) => {
        if (!news) return res.status(500).end('Error retrieving the news');
        res.json(news);
    });
}

export default { getPortfolio, createPortfolio, makeNewTransaction, addToPortfolio, removeFromPortfolio, getTransactions, getNews};