import React, { Component } from 'react';
import API from '../APIService';

import './PortfolioTable.css'
import Sell from "./Sell/Sell";

const Myusername = 'testAmine';

class PortfolioTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            currentSell: null
        };
    }

    componentDidMount() {
        this.updatePortfolio();
    }

    updatePortfolio() {
        API.getPortfolio(Myusername).then((res) => {
            this.setState({ stocks: res.stocks});
        });
    }

    setCurrentSell(stockObj) {
        this.setState({currentSell : stockObj});
    }

    renderEntry(stockObj) {
        var delta = (stockObj.boughtPrice - stockObj.currentPrice);
        var Pdelta = delta / stockObj.boughtPrice;
        return (<div className="ptable-row">
            <button type="button" className="ptable-cell btn btn-primary mb-2" onClick={() => this.setCurrentSell(stockObj)}>Sell</button>
            <div className="ptable-cell">{stockObj.symbol}</div>
            <div className="ptable-cell">{stockObj.quantity}</div>
            <div className="ptable-cell">{stockObj.boughtPrice}</div>
            <div className="ptable-cell">{stockObj.currentPrice}</div>
            <div className="ptable-cell">{delta} | {Pdelta}%</div>
            { this.state.currentSell === stockObj? <Sell symbol={stockObj.symbol} price={stockObj.currentPrice} quantity={stockObj.quantity} refresh={() => this.updatePortfolio()}/>: ""}
        </div>);
    }

    render() {
        return <div className="portfolio-table">
            <div className="ptable-header ptable-row">
                <div className="ptable-cell"></div>
                <div className="ptable-cell">Symbol</div>
                <div className="ptable-cell">Quantity</div>
                <div className="ptable-cell">bought</div>
                <div className="ptable-cell">current</div>
                <div className="ptable-cell">Performace</div>
            </div>
            { this.state.stocks.map((stock) => { return this.renderEntry(stock);}) }
        </div>

    }
}

export default PortfolioTable