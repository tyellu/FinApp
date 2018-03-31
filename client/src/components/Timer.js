import React, { Component } from 'react';
import '../css/timer.css';

var countdownTicker = -1;

class Timer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime:new Date(),
            countdown:0,
            open:true
        };
    }

    componentDidMount() {
        this.updateCounter();
    }

    updateCounter(){
        this.setState({startTime:new Date()});
        var day = this.state.startTime.getDay();
        var hour = this.state.startTime.getHours();
        var minute = this.state.startTime.getMinutes();

        var minLeft = 59 - minute;
        var hourLeft;

        if (day===6 || day === 0 || hour <9 || hour>16){
            this.setState({open:false});
            hourLeft = (24 - (hour + 1)); 
            if  (day === 5){
                hourLeft += 57;
            } else if (day === 6){
                hourLeft += 33;
            } else {
                hourLeft += 9;
            }
        } else {
            this.setState({open:true});
            hourLeft = 17 - (hour + 1);
        }

        this.setState({countdown:minLeft+(hourLeft*60)});

        countdownTicker = setInterval(() => {
                    this.setState({countdown:this.state.countdown-1});
                    if (this.state.countdown===0){
                        this.setState({open:!this.state.open});
                        clearInterval(countdownTicker);
                        countdownTicker = -1;
                        this.updateCounter();
                    }
                }, 60000);
    }

    render() {
        return <div>
        <h1 className={ this.state.open ? "open":"close"}>
        { this.state.open ? "Market is now open. Will close in " + Math.floor(this.state.countdown/60) + "hrs and " + this.state.countdown%60 + "mins": "Market is now closed. Will open in "  + Math.floor(this.state.countdown/60) + " hrs and " + this.state.countdown%60 + " mins"}
        </h1>
        </div>

    }
}

export default Timer;