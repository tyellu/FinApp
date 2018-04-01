import React, { Component } from 'react';
import ReactTable from 'react-table';
import API from '../APIService';

import '../styles/css/table.css'

let  timerId = -1;

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
            this.setState({ transactions: res || []});
        }).catch(e => console.log(e));
        
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.transactions.length !== 0 && timerId === -1){
            let date = new Date();
            let day = date.getDay();
            let hour = date.getHours();
            // if mon-fri, 9-5
            if ((day>0 && day<6) && (hour>8 && hour<17)){
                // start the timer, every 1 second
                timerId = setInterval(() => {
                    console.log("Timer made a request");
                    let date = new Date();
                    let day = date.getDay();
                    let hour = date.getHours();
                    if (!(day>0 && day<6) || !(hour>8 && hour<17)){
                        clearInterval(timerId);
                        timerId= -1;
                    } else {
                        let promise = new Promise((resolve, reject) => { this.props.refresh();});
                        promise.then(this.updateTransactions());
                    }
                }, 1000);
            }
            
        } else if (this.state.transactions.length === 0 && timerId !== -1){
            clearInterval(timerId);
            timerId= -1;
        }
    }

    render() {
        //console.log(this.state.transactions);
        if (this.state.transactions.length > 0)
            return (
                <ReactTable
                    className="pending-table"
                    data={this.state.transactions}
                    columns={[
                        {
                            Header: "Pending Transactions",
                            columns: [
                                {
                                    Header: "Symbol",
                                    accessor: 'symbol'
                                },
                                {
                                    Header: "Quantity",
                                    accessor: 'quantity'
                                },
                                {
                                    Header: "Type",
                                    accessor: 'type'
                                }]
                        }
                    ]}
                    showPagination={false}
                    minRows={1}
                    defaultPageSize={4}
                    />
            );
        else
             return <div className="no-pending">No Pending Transactions</div>
        /*return <div className="transaction-table">
            <br></br>
            Pending Transactions
            <div className="ptable-header ptable-row">
                <div className="ptable-cell">Symbol</div>
                <div className="ptable-cell">Quantity</div>
                <div className="ptable-cell">Type</div>
            </div>
            { this.state.transactions.map((transaction) => { return this.renderEntry(transaction);}) }
        </div>*/

    }
}

export default PendingTransactions;