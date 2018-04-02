import React, { Component } from 'react';
import '../../styles/css/Portfolio.css'
import PortfolioOverview from "../Dashboard/portfolioOverview";
import Graph from "../Graph";
import API from '../../APIService';
import PortfolioTable from "./PortfolioTable";
import Buy from "./Buy";
import Timer from '../Timer';
import PendingTransactions from "../PendingTransactions";

class Portfolio extends Component{
    constructor(props) {
        super(props);
        this.state = {
            portfolio: "",
            graphSymbol: null,
            transactions: []
        }
    }

    componentDidMount() {
        this.updatePortfolio();
    }

    updatePortfolio() {
        API.getPortfolio().then((res) => {
            this.setState({ portfolio: res || ""});
            this.updateTransactions();
        }).catch(e => console.log(e));
    }

    buy(quantity, symbol) {
        API.makeNewTransaction(symbol, quantity, "buy").then((res) => {
            //document.getElementById("buy-form").reset();
            this.updatePortfolio();
        });
    }

    sell(quantity, symbol) {
        API.makeNewTransaction(symbol, quantity, "sell").then((res) => {
            this.updatePortfolio();
        });
    }

    updateTransactions() {
        API.getTransactions().then((res) => {
            this.setState({ transactions: res || []});
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                <div className="portfolio-container">
                    <div className="portfolio-item portfolio-overview">
                        <PortfolioOverview link="dashboard" portfolio={this.state.portfolio}/>
                    </div>
                    <div className="portfolio-item portfolio-table">
                        <PortfolioTable
                            stocks={this.state.portfolio.stocks}
                            showGraph={(symbol) => this.setState({graphSymbol: symbol})}
                            sell={(quantity, symbol) => this.sell(quantity, symbol)}/>
                    </div>
                    <div className="portfolio-item portfolio-graph">
                        { this.state.graphSymbol? <Graph type="stock" symbol={this.state.graphSymbol}/> : ""}
                    </div>
                    <div className="portfolio-item portfolio-buy">
                        <Buy buy={(quantity, symbol) => this.buy(quantity, symbol)}/>
                    </div>
                    <div className="portfolio-item portfolio-pending">
                        <PendingTransactions
                            transactions={this.state.transactions}
                            refresh={() => this.updatePortfolio()}
                            updateTransactions={() => this.updateTransactions()}/>
                    </div>
                    <div className="ticker">
                        <Timer/>
                    </div>
                </div>
            </div>);
    }
}

export default Portfolio;