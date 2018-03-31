import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/css/PortfolioTable.css'

class PortfolioOverview extends Component{
    getMarketValue(stocks){
        let marketValue = 0;
        stocks.map(x => (marketValue += (x.currentPrice * x.quantity)));
        return marketValue;
    }

    render() {
        if (this.props.portfolio) {
            const defaultAmt = 10000;
            const balance = this.props.portfolio.balance;
            let marketValue = 0;
            if(Object.keys(this.props.portfolio).length !== 0 && (this.props.portfolio).constructor === Object){
                marketValue = this.getMarketValue(this.props.portfolio.stocks);
            }
            const accValue = (((balance + marketValue)*100)/100);
            const performance = (((accValue - defaultAmt) / defaultAmt) * 100);
            return (
                <div className="overview-container">
                    <span>
                        <span>Account Value: ${accValue.toFixed(2)} </span>
                        <span style={performance>0 ? {color: "green"}: {color: "red"}}>({performance.toFixed(2)}%)</span>
                    </span>
                        <span>
                        Remaining Balance: ${balance.toFixed(2)}
                    </span>
                    { this.props.link === "portfolio"? <Link to="/portfolio">Go to Portfolio</Link> : ""}
                    { this.props.link === "dashboard"? <Link to="/dashboard">Go to Dashboard</Link>: ""}
                </div>
            )
        } else {
            return (
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            );
        }
    }
}

export default PortfolioOverview;