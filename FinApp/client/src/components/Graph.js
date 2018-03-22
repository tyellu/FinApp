import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import API from '../APIService';

class Graph extends Component {


    constructor(props) {
        super(props);
        this.state = {
            scale: "DAILY",
            valueSet : [],
            volumeSet :[],
            labels : [],
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
                labels : Object.keys(res)
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
                yAxisID: 'y-axis-1'
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
                yAxisID: 'y-axis-2',
                lineTension: 0
            }]
        };

        const options = {
            responsive: true,
            tooltips: {
                mode: 'index'
            },
            elements: {
                line: {
                    fill: true
                }
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false
                        },
                        labels: this.state.labels.reverse(),
                    }
                ],
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
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

        return (
            <div className="graph-container">
                { this.state.labels.length === 0 ?
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div> :
                    <div>
                        <h2>{this.state.scale} MARKET SUMMARY: {this.props.symbol}</h2>
                        <Bar
                            data={data}
                            options={options}
                        />
                        <div className="button-bar">
                            <button type="button" className="ptable-cell btn btn-primary" disabled={this.state.scale === "DAILY"} onClick={() => this.setState({ scale: "DAILY"})}>DAILY</button>
                            <button type="button" className="ptable-cell btn btn-primary" disabled={this.state.scale === "MONTHLY"} onClick={() => this.setState({ scale: "MONTHLY"})}>MONTHLY</button>
                            <button type="button" className="ptable-cell btn btn-primary" disabled={this.state.scale === "YEARLY"} onClick={() => this.setState({ scale: "YEARLY"})}>YEARLY</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Graph;