import React, { Component } from 'react';
import ReactTable from 'react-table'
import '../../styles/css/react-table.css';
import '../../styles/css/table.css';

class PortfolioSummary extends Component{
    render() {
        let data = [];
        if (this.props.portfolio)
            data = this.props.portfolio.stocks;

        const columns = [
            {
                Header: 'Stocks',
                accessor: 'symbol'
            },
            {
                id: 'performance',
                Header: 'Performance',
                accessor: datum => ((datum.currentPrice - datum.boughtPrice) / datum.currentPrice) * 100,
                Cell : item => (
                    <span style={item.value>0 ? {color: "green"}: {color: "red"}}>
                        {item.value.toFixed(2)}
                    </span>
                )
            }
        ];

        return (<div>
                <ReactTable
                    className="summary-table"
                    data={data}
                    columns={columns}
                    showPagination={false}
                    minRows={1}
                    defaultPageSize={7}
                />
            </div>)

    }
}

export default PortfolioSummary