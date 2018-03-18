import React, { Component } from 'react';
import Buy from './Buy/Buy';
import Sell from './Sell/Sell';
import PortfolioTable from './PortfolioTable';

import './Portfolio.css';

class Portfolio extends Component{
    constructor(props) {
        super(props);
        this.state = {
            buyEnabled: false,
        };
    }

    showBuy() {
        return this.state.buyEnabled ? <Buy/>: "";
    }

    render() {
        return <div>
            <h2>My Portfolio</h2>
            <PortfolioTable/>
            <div className={ this.state.buyEnabled? 'buy-container expanded': 'buy-container collapsed'}>
                <button onClick={() => this.setState({buyEnabled: !this.state.buyEnabled })} type="button">Buy More</button>
                { this.showBuy() }
            </div>
       </div>
    }
}

export default Portfolio;