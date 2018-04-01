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
                Cell : datum => {
                    let delta = (datum.original.currentPrice - datum.original.boughtPrice);
                    let performance = (delta / datum.original.currentPrice) * 100;
                    return (<span style={delta >= 0 ? {color: "green"} : {color: "red"}}>
                        {`$${delta.toFixed(2)} (${performance.toFixed(2)}%)` }
                    </span>)
                }
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
                    defaultSorted={[
                        {
                            id: "performance",
                            desc: true
                        }
                    ]}
                />
            </div>)

    }
}

export default PortfolioSummary