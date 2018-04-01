import React, { Component } from 'react';
import ReactTable from 'react-table'
import '../../styles/css/PortfolioTable.css'
import Sell from "./Sell";

class PortfolioTable extends Component{
    render() {
        return (<div>
            <ReactTable
                data={this.props.stocks}
                defaultPageSize={5}
                showPageSizeOptions={false}
                showPageJump={false}
                className="table-container"
                columns = {[
                    {
                        accessor: 'symbol',
                        width: 60,
                        Cell: symbol => <div className="show-graph" onClick={() => this.props.showGraph(symbol.value)}></div>
                    },
                    {
                        Header: "Symbol",
                        //accessor: datum => { return async API.getSymbolDescription(datum.symbol)}
                        accessor: 'symbol'
                    },
                    {
                        Header: "Quantity",
                        accessor: 'quantity',
                        width: 50
                    },
                    {
                        id: "bought-price",
                        Header: "Bought Price",
                        accessor: datum => { return `$${datum.boughtPrice.toFixed(2)}`}
                    },
                    {
                        id: "current-price",
                        Header: "Current Price",
                        accessor: datum => { return `$${datum.currentPrice.toFixed(2)}`}
                    },
                    {
                        id: 'performance',
                        Header: 'Performance',
                        Cell : datum => {
                            let delta = (datum.original.currentPrice - datum.original.boughtPrice);
                            let performance = (delta / datum.original.currentPrice) * 100;
                            return (<span style={ delta >= 0 ? {color: "green"} : {color: "red"}}>
                                {`$${delta.toFixed(2)} (${performance.toFixed(2)}%)` }
                            </span>)
                        }
                    },
                    {
                        id: 'Sell',
                        Header: 'Sell',
                        width: 150,
                        Cell : stock => (
                            <Sell
                                sell={(quantity, symbol) => this.props.sell(quantity, symbol)}
                                symbol={stock.original.symbol}
                                price={stock.original.currentPrice}
                                quantity={stock.original.quantity}/>
                        )
                    }
                    /*,
                    {
                        expander: true,
                        width: 65,
                        Expander: ({ isExpanded, ...rest }) =>
                            <div>
                                {isExpanded
                                    ? <span>&#x2299;</span>
                                    : <span>&#x2295;</span>}
                            </div>,
                        style: {
                            cursor: "pointer",
                            fontSize: 25,
                            padding: "0",
                            textAlign: "center",
                            userSelect: "none"
                        }
                    }*/
                ]}
                /*SubComponent={(stock) =>
                    <Sell
                        refresh={() => this.props.refresh()}
                        symbol={stock.original.symbol}
                        price={stock.original.currentPrice}
                        quantity={stock.original.quantity}/>}*/
            />
        </div>)
    }
}

export default PortfolioTable