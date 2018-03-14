import Portfolio from '../models/portfolio.model';
import Stock from '../models/stock.model';

function createPortfolio(req, res, next) {
    Portfolio.create(req.body, function(err, portfolio){
        res.json(portfolio);
    });
}

function getPortfolio(req, res, next){
    console.log("===== PORTFOLIO ======");
    console.log(Portfolio.find());
    console.log("======================");
    Portfolio.find({username: req.params.username}, function(err, portfolio){
        // retrieve the details of all stocks in portfolio
        Stock.find({_id: {'$in': portfolio.stocks}}, (err, stockList) => {
            portfolio.stocks = stockList;
            res.json(portfolio);
        });
    });
}

function addToPortfolio(req, res, next){
    console.log("======== STOCK ======");
    console.log(Stock.find());
    console.log("======================");
    const stock = new Stock({
        symbol: req.symbol,
        quantity: req.quantity,
        price: req.price
    });

    stock.save()
        .then((newStock) => {
            var purchasePrice = newStock.quantity * newStock.price;
            Portfolio.update(
                { username: req.params.username},
                {
                    $push: {stocks: ObjectId(newStock._id)},
                    $inc: {balance: -purchasePrice}
                }, (err, portfolio) => {
                    res.json(portfolio);
                });
        })
        .catch((err) => next(err));
}

export default {getPortfolio, addToPortfolio, createPortfolio};