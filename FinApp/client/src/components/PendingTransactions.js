import React, { Component } from 'react';
import API from '../APIService';

var  timerId = -1;

class PendingTransactions extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            transactions: []
        };
    }

    componentDidMount() {
        this.updateTransactions();
    }


    updateTransactions() {
        API.getTransactions().then((res) => {
            this.setState({ transactions: res});
        });
        
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.transactions.length !== 0 && timerId === -1){
            var date = new Date();
            var day = date.getDay();
            var hour = date.getHours();
            // if mon-fri, 9-5
            if ((day>0 && day<6) && (hour>8 && hour<17)){
                // start the timer, every 1 second
                timerId = setInterval(() => {
                    console.log("Timer made a request");
                    var date = new Date();
                    var day = date.getDay();
                    var hour = date.getHours();
                    if (!(day>0 && day<6) || !(hour>8 && hour<17)){
                        clearInterval(timerId);
                        timerId= -1;
                    } else {
                        var promise = new Promise((resolve, reject) => { this.props.refresh();});
                        promise.then(this.updateTransactions());
                    }
                }, 1000);
            }
            
        } else if (this.state.transactions.length === 0 && timerId !== -1){
            clearInterval(timerId);
            timerId= -1;
        }
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
            <br></br>
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