var CronJob = require('cron').CronJob;
import Portfolio from '../models/portfolio.model';
import accHistory from '../models/accHistory.model';


var accHist = new CronJob('00 59 23 * * 0-6', function() {
    Portfolio.find({}, (err,portfolios) => {
        portfolios.forEach((p) => {
            // console.log("====P====");
            // console.log(p);
            accHistory.findOneAndUpdate(
                {email: p.email},
                {$setOnInsert:{email: p.email, history: [{accValue: Number(p.balance)}]}},
                {safe: true, new: true, upsert: true},
                function (err, acc){
                    if(err) console.log(err);
                    if(acc) console.log("account " + acc.email + " preserved");
                }
            );
        });
    });
}, function(){console.log("accounts store");}, false, 'America/Toronto');


export default accHist;