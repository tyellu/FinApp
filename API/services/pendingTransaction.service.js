var CronJob = require('cron').CronJob;
import Transaction from '../models/transactions.model';
import portfolioService from '../services/portfolio.service';

var pendingTransaction = new CronJob('59 * * * * *', function() {
  Transaction.find().sort({createdAt:1}).limit(1).exec(function(err, transaction){
      if (err) {
          console.log("Failed to read from Transactions database");
      } else {
        if (transaction.length != 0){
            Transaction.remove({_id:transaction[0]._id}, function(err, del_transaction){
                if (transaction[0].type === "buy"){
                    portfolioService.addToPortfolio(transaction[0]);
                } else {
                    portfolioService.removeFromPortfolio(transaction[0]);
                }
            });
        }
      }
    });
  }, function () {},
 false,
 'America/Toronto'
);

export default pendingTransaction;