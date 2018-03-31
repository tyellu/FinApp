import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import '../styles/css/graph.css'
import API from '../APIService';

class Graph extends Component {


    constructor(props) {
        super(props);
        this.state = {
            scale: "YEARLY",
            valueSet : [],
            volumeSet :[],
            labels : [],
            loadedSymbol: ""
        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (nextProps.symbol !== this.props.symbol || nextState.scale !== this.state.scale) //{
    //     //     // should do an update after fetching the new quote data
    //     //     console.log("symbol/scale changed:" + nextProps.symbol + this.props.symbol + " | " + nextState.scale + this.state.scale)
    //     //     this.getGraphData();
    //     //     return false
    //     // } else
    //     //     return true
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.symbol !== this.props.symbol || prevState.scale !== this.state.scale) {
            this.getGraphData();
        }
    }

    componentDidMount() {
        this.getGraphData();
    }

    getGraphData() {
        this.labels = [];
        API.getQuoteDetails(this.props.symbol, this.state.scale).then(res => {
            console.log(res);
            this.setState({
                valueSet : Object.keys(res).map((key) => { return Number(res[key].high) }),
                volumeSet : Object.keys(res).map((key) => { return Number(res[key].volume) }),
                labels : Object.keys(res),
                loadedSymbol: this.props.symbol
            });

        }).catch(err => console.log(err));
    }

    render() {
        const data = {
            datasets: [{
                type: 'bar',
                label: 'Volume',
                data: this.state.volumeSet.reverse(),
                fill: false,
                backgroundColor: '#77d7ff',
                borderColor: '#77d7ff',
                hoverBackgroundColor: '#007bff',
                hoverBorderColor: '#007bff',
                yAxisID: 'volume-axis'
            },{
                label: 'Quote',
                type:'line',
                data: this.state.valueSet.reverse(),
                fill: true,
                borderColor: '#71B37C',
                backgroundColor: '#A6F7B1',
                pointBorderColor: '#71B37C',
                pointBackgroundColor: '#71B37C',
                pointHoverBackgroundColor: '#047a0b',
                pointHoverBorderColor: '#047a0b',
                yAxisID: 'quote-axis',
                lineTension: 0,
                pointHitRadius: 20,
            }]
        };

        const options = {
            responsive: true,
            tooltips: {
                mode: 'nearest'
            },
            elements: {
                line: {
                    fill: true
                }
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                        gridLines: {
                            display: false
                        },
                        labels: this.state.labels.reverse(),
                    }
                ],
                yAxes: [
                    {
                        type: 'linear',
                        display: false,
                        position: 'left',
                        id: 'volume-axis',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: false
                        }//,
                        // ticks: {
                        //     max: Math.max.apply(Math, this.state.volumeSet)
                        // }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'quote-axis',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    }
                ]
            }
        };

        if (this.state.labels.length === 0 || this.state.loadedSymbol !== this.props.symbol)
            return (
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            );
        else
            return (
                    <div className="graph-container">
                        <span className="graph-title">{this.state.scale} MARKET SUMMARY: {this.props.symbol}</span>
                        <Bar
                            data={data}
                            options={options}
                        />
                        { this.props.type === "stock"?
                            <div className="button-bar">
                                <button type="button" disabled={this.state.scale === "DAILY"} onClick={() => this.setState({ scale: "DAILY", loadedSymbol: ""})}>DAILY</button>
                                <button type="button" disabled={this.state.scale === "MONTHLY"} onClick={() => this.setState({ scale: "MONTHLY", loadedSymbol: ""})}>MONTHLY</button>
                                <button type="button" disabled={this.state.scale === "YEARLY"} onClick={() => this.setState({ scale: "YEARLY", loadedSymbol: ""})}>YEARLY</button>
                            </div> : ""}
                    </div>
            );
    }
}

export default Graph;