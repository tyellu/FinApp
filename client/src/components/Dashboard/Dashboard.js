import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import PortfolioOverview from "./portfolioOverview";
import PortfolioSummary from "./PortfolioSummary";
import Graph from "../Graph";
import API from '../../APIService';
import Lobby from '../Rooms/RoomLobby';
import NewsFeed from "../NewsFeed";
import Timer from "../Timer";

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
        }).catch(e => console.log(e));
    }

    render() {
        return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-item portfolio-overview">
                    <PortfolioOverview link="portfolio" portfolio={this.state.portfolio}/>
                </div>

                <div className="dashboard-item dashboard-graph" id="graph-container">
                    <Graph type="portfolio" symbol="" portfolio={this.state.portfolioHistory}/>
                </div>
                <div className="dashboard-item portfolio-summary">
                    <PortfolioSummary portfolio={this.state.portfolio}/>
                </div>
                <div className="dashboard-item rooms">
                    <Lobby /> 
                </div>
                <div className="dashboard-item news-feed">
                    <NewsFeed/>
                </div>
                <div className="ticker">
                    <Timer/>
                </div>
            </div>
        </div>);
    }

}
export default Dashboard;