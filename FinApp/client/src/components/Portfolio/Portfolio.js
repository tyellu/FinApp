import React, { Component } from 'react';
import '../../styles/css/Portfolio.css'
import PortfolioOverview from "../Dashboard/portfolioOverview";
import Graph from "../Graph";
import API from '../../APIService';
import PortfolioTable from "./PortfolioTable";
import Buy from "./Buy";

class Portfolio extends Component{
    constructor(props) {
        super(props);
        this.state = {
            portfolio: "",
            graphSymbol: null
        }
    }

    componentDidMount() {
        this.updatePortfolio();
    }

    updatePortfolio() {
        API.getPortfolio().then((res) => {
            this.setState({ portfolio: res});
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
                            refresh={() => this.updatePortfolio()}/>
                    </div>
                    <div className="portfolio-item portfolio-graph">
                        { this.state.graphSymbol? <Graph type="stock" symbol={this.state.graphSymbol}/> : ""}
                    </div>
                    <div className="portfolio-item portfolio-buy">
                        <Buy refresh={() => this.updatePortfolio()}/>
                    </div>
                </div>
            </div>);
    }
}

export default Portfolio;