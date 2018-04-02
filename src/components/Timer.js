import React, { Component } from 'react';
import '../styles/css/ticker.css';

let countdownTicker = -1;

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
        let day = this.state.startTime.getDay();
        let hour = this.state.startTime.getHours();
        let minute = this.state.startTime.getMinutes();

        let minLeft = 59 - minute;
        let hourLeft;

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
        return (
            <div className="ticker-container">
                <span className={ this.state.open ? "open":"close"}>
                    { this.state.open ? "Market is open. Closes in " + Math.floor(this.state.countdown/60) + "hrs and " + this.state.countdown%60 + "mins": "Market is closed. Opens in "  + Math.floor(this.state.countdown/60) + " hrs and " + this.state.countdown%60 + " mins"}
                </span>
                <a className="logout" href="https://api-marketsim.herokuapp.com/logout">Logout</a>
            </div>
        )

    }
}

export default Timer;