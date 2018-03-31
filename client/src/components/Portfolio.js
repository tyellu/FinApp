import React, { Component } from 'react';
import Buy from './Buy';
import Graph from './Graph';
import PortfolioTable from './PortfolioTable';
import PendingTransactions from './PendingTransactions';
import PortfolioOverview from './portfolioOverview';
import NewsFeed from './NewsFeed';
import '../css/Portfolio.css';

class Portfolio extends Component{
    constructor(props) {
        super(props);
        this.state = {
            buyEnabled: false,
            graph: ""
        };
    }

    showBuy() {
        return this.state.buyEnabled ? <Buy refresh={() => {this.refs.pendingTransactionsTable.updateTransactions(); } }/>: "";
    }

    graph(symbol) {
        this.setState({ graph: symbol });
    }

    render() {
        return <div>
            <h2>My Portfolio</h2>
            <PortfolioOverview/>
            <PortfolioTable ref="portfolioTable" graph={(symbol) => this.graph(symbol)} refresh={() => {this.refs.pendingTransactionsTable.updateTransactions(); } }/>
            { this.state.graph === ""? "": <Graph symbol={this.state.graph}/> }
            <div className={ this.state.buyEnabled? 'buy-container expanded': 'buy-container collapsed'}>
                <button onClick={() => this.setState({buyEnabled: !this.state.buyEnabled })} type="button" className="buy-button">{ this.state.buyEnabled? '-':'+'}Buy</button>
                { this.showBuy() }
            </div>
            <PendingTransactions ref="pendingTransactionsTable" refresh={() => {this.refs.portfolioTable.updatePortfolio();} }/>
            <NewsFeed/>
       </div>
    }
}


export default Portfolio;