import React, { Component } from 'react';
import '../../styles/css/dashboard.css'
import PortfolioOverview from "./portfolioOverview";
import PortfolioSummary from "./PortfolioSummary";
import Graph from "../Graph";
import API from '../../APIService';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: "",
            portfolioHistory: {}
        }
    }

    componentDidMount() {
        this.updatePortfolio();
    }

    updatePortfolio() {
        API.getPortfolio().then((res) => {
            this.setState({ portfolio: res});
        });
        API.getPortfolioHistory().then((res) => {
            this.setState({portfolioHistory: [100,110,130,140,150,200,190,140]});
        })
    }

    render() {
        return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-item portfolio-overview">
                    <PortfolioOverview link="portfolio" portfolio={this.state.portfolio}/>
                </div>
                <div className="dashboard-item dashboard-graph" id="graph-container">
                    <Graph type="portfolio" portfolio={this.state.portfolioHistory} symbol="AAPL"/>
                </div>
                <div className="dashboard-item portfolio-summary">
                    <PortfolioSummary portfolio={this.state.portfolio}/>
                </div>
                <div className="dashboard-item rooms">
                    4
                </div>
                <div className="dashboard-item news-feed">
                    5
                </div>
            </div>
        </div>);
    }

}
export default Dashboard;