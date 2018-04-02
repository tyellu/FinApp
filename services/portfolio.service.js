import Portfolio from '../models/portfolio.model';
import Stock from '../models/stock.model';
import Transaction from '../models/transactions.model';
import AlphaIntegration from '../Integration/AlphaIntegration';
import AccHist from '../models/accHistory.model';



function getPortfolio(req, res, next){
    var query;
    if(req.params.room){
        query = {
        email: req.user.email,
            roomName: req.params.room
    };
    }else{
        query = {
            email: req.user.email,
        };
    }
    Portfolio.findOne(query, function(err, portfolio){
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
    var query;
    if(req.params.room){
        query = {
        email: req.user.email,
            roomName: req.params.room
    };
    }else{
        query = {
            email: req.user.email,
        };
    }
    Transaction.find(query, function(err, transactions){
        res.json(transactions);
    });
}

function makeNewTransaction(req, res, next){
    var transaction;
    if(req.params.room){
        transaction = {
            email:req.user.email,
            symbol:req.body.symbol,
            quantity:req.body.quantity,
            type:req.body.type,
            room:req.params.room
        };
    }else{
        transaction = {
            email:req.user.email,
            symbol:req.body.symbol,
            quantity:req.body.quantity,
            type:req.body.type
        };
    }
    Transaction.create(transaction, function(err, transaction){
        //applyNextTransaction(res);
        res.json("Added transaction to queue");
    });
}

function addToPortfolio(transaction){
    console.log("==== ADD PORTFOLIO ========");
    var query;
    if(transaction.room){
        query = {
            email: transaction.email,
            roomName: transaction.room
        };
    }else{
        query = {
            email: transaction.email,
        };
    }
    AlphaIntegration.getCurrentPrice(transaction.symbol, currentPrice => {
        Portfolio.findOne(query, function(err, portfolio){
            if(portfolio.balance >= (currentPrice * transaction.quantity)){
                Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                    var contained = false;
                    var stock = stockList.find((stockItem) => { return stockItem.symbol === transaction.symbol;});
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
            }else{
                console.log("not enough funds");
            } 
        });
    });
}


function removeFromPortfolio(transaction) {
    console.log("==== RM PORTFOLIO ========");
    var query;
    if(transaction.room){
        query = {
            email: transaction.email,
            roomName: transaction.room
        };
    }else{
        query = {
            email: transaction.email,
        };
    }
    AlphaIntegration.getCurrentPrice(transaction.symbol, (currentPrice) => {
        Portfolio.findOne(query, function(err, portfolio){
            Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
                var stock = stockList.find((stockItem) => { return stockItem.symbol === transaction.symbol;});
                if (stock) //res.status(500).end("stock not in portfolio");
                {
                    if (stock.quantity >= transaction.quantity) //res.status(500).end("invalid quantity");
                    {
                        stock.quantity -= transaction.quantity;

                        if (!stock.quantity) {
                            stock.remove()
                                .then(() => {
                                portfolio.stocks = portfolio.stocks.filter((stockId) => { return stockId !== stock._id;});
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


function getPortfolioHistory(req, res, next) {
    AccHist.findOne({email: req.user.email}, function(err, portfolioHistory){
        if(err) {console.log(err);res.status(500).send(err);}
        res.json(portfolioHistory);
    });
}

export default { getPortfolio, makeNewTransaction, addToPortfolio, removeFromPortfolio, getTransactions, getPortfolioHistory};