import Portfolio from '../models/portfolio.model';
import Stock from '../models/stock.model';
import AlphaIntegration from '../Integration/AlphaIntegration';

function createPortfolio(req, res, next) {
    Portfolio.create(req.body, function(err, portfolio){
        res.json(portfolio);
    });
}

function getPortfolio(req, res, next){
    Portfolio.findOne({username: req.params.username}, function(err, portfolio){
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
                    username: portfolio.username,
                    balance: portfolio.balance,
                    stocks: modifiedStockList
                });
            });
        });
    });
}

function addToPortfolio(req, res, next){
    const stock = new Stock({
        symbol: req.body.symbol,
        quantity: req.body.quantity,
        price: req.body.price
    });

    stock.save()
        .then((newStock) => {
            var purchasePrice = newStock.quantity * newStock.price;
            Portfolio.findOneAndUpdate(
                { username: req.params.username},
                {
                    $push: {stocks: newStock._id},
                    $inc: {balance: -purchasePrice}
                },
                {new: true, safe: true, returnNewDocument : true},
                (err, portfolio) => {
                    res.json(portfolio);
                });
        })
        .catch((err) => next(err));
}

function removeFromPortfolio(req, res, next) {
    Stock.findById(req.body.stockId).then((stock) => {
        var balanceChange = (req.body.quantity * req.body.price) * (stock.price * stock.quantity);
        portfolio.findOneAndUpdate(
            { username: req.params.username},
            {
                $pull: { stocks: stock._id },
                $inc: { balance: balanceChange }
            },
            {new: true, safe: true, returnNewDocument : true},
            (err, portfolio) => {
                res.json(portfolio);
            })
    })
}

export default { getPortfolio, addToPortfolio, createPortfolio, removeFromPortfolio};