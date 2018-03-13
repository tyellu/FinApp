import Portfolio from '../models/portfolio.model.js';

function getStocks(req, res, next){
    Portfolio.find({username:req.params.username}, function(err, portfolio){
        res.json(portfolio);
    });
}

function addStocks(req, res, next){
    Portfolio.create(req.body, function(err, portfolio){
        res.json(usr);
    });
}

export default {getStocks, addStocks};