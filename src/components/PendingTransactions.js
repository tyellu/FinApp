import React, { Component } from 'react';
import ReactTable from 'react-table';

import '../styles/css/table.css'

let  timerId = -1;

class PendingTransactions extends Component{

    componentDidMount() {
        this.props.updateTransactions();
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.transactions.length !== 0 && timerId === -1){
            let date = new Date();
            let day = date.getDay();
            let hour = date.getHours();
            // if mon-fri, 9-5
            if ((day>0 && day<6) && (hour>8 && hour<17)){
                // start the timer, every 1 second
                timerId = setInterval(() => {
                    let date = new Date();
                    let day = date.getDay();
                    let hour = date.getHours();
                    if (!(day>0 && day<6) || !(hour>8 && hour<17)){
                        clearInterval(timerId);
                        timerId= -1;
                    } else {
                        this.props.refresh();
                    }
                }, 1000);
            }
            
        } else if (this.props.transactions.length === 0 && timerId !== -1){
            clearInterval(timerId);
            timerId= -1;
        }
    }

    render() {
        if (this.props.transactions.length > 0)
            return (
                <ReactTable
                    className="pending-table"
                    data={this.props.transactions}
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

    }
}

export default PendingTransactions;