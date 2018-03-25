import React, { Component } from 'react';
import API from '../APIService';
var CronJob = require('cron').CronJob;

class PendingTransactions extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            transactions: [],
            job: ''
        };
        this.updateTransactions();
    }

    componentDidMount() {
        var job = new CronJob('* * * * * 0-6', function() {
            this.updateTransactions();
        }, function () {},
        false,
        'America/Toronto'
        );
        this.setState({ job: job});
        this.updateTransactions();
    }


    updateTransactions() {
        API.getTransactions().then((res) => {
            this.setState({ transactions: res});
            if (this.state.transactions.length != 0){
                this.state.job.start();
            } else {
                this.state.job.stop();
            }
        });
    }

    renderEntry(transaction) {
        return (<div key={transaction._id} className="ptable-row">
                <div className="ptable-cell">{transaction.symbol}</div>
                <div className="ptable-cell">{transaction.quantity}</div>
                <div className="ptable-cell">{transaction.type}</div>
            </div>);
    }

    render() {
        return <div className="transaction-table">
            Pending Transactions
            <div className="ptable-header ptable-row">
                <div className="ptable-cell">Symbol</div>
                <div className="ptable-cell">Quantity</div>
                <div className="ptable-cell">Type</div>
            </div>
            { this.state.transactions.map((transaction) => { return this.renderEntry(transaction);}) }
        </div>

    }
}

export default PendingTransactions