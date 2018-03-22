import React, { Component } from 'react';
import API from '../APIService';

import '../css/PortfolioTable.css';
import Sell from "./Sell";

class PortfolioOverview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            portfolio: {},
        };
    }

    componentDidMount() {
        this.updatePortfolio();   
    }

    updatePortfolio() {
        API.getPortfolio().then((res) => {
            this.setState({ portfolio: res});
        });
    }

    getMarketValue(stocks){
        console.log(stocks);
        var marketValue = 0;
        stocks.map(x => (marketValue += (x.currentPrice * x.quantity)));
        return marketValue;
    }

    render() {
        const defaultAmt = 10000;
        const balance = Math.round(this.state.portfolio.balance * 100) / 100;
        var marketValue;
        if(Object.keys(this.state.portfolio).length != 0 && (this.state.portfolio).constructor === Object){
            marketValue = this.getMarketValue(this.state.portfolio.stocks);
        }
        const accValue = Math.round((balance + marketValue)*100)/100;
        const el = Math.round(((accValue - defaultAmt) / defaultAmt) * 100)/100;
        return <div className="portfolio-table">
            <div className="ptable-header ptable-row">
                <div className="ptable-cell">Account Value</div>
                <div className="ptable-cell">Prinicipal Funds</div>
                <div className="ptable-cell">Available Funds</div>
                <div className="ptable-cell">NET Earnings/Loss</div>
            </div>
            <div className="ptable-row">
                <div className="ptable-cell">{accValue}</div>
                <div className="ptable-cell">{defaultAmt}</div>
                <div className="ptable-cell">{balance}</div>
                <div className="ptable-cell">{el}</div>
            </div>
            </div>

    }
}

export default PortfolioOverview