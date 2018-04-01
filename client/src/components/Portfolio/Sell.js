import React, { Component } from 'react';

class Sell extends Component{

    sell(){
        const sellQuantity = document.getElementById("sellQuantity-" + this.props.symbol).value;
        this.props.sell(sellQuantity, this.props.symbol);
    }

    render() {
        return <form className="sell-group">
                <input type="number" id={ `sellQuantity-${this.props.symbol}` } style={{width: 70}} max={this.props.quantity} min="0"/>
                <button type="button" style={{width: 70}} onClick={() => this.sell()}>Sell</button>
            </form>
    }
}

export default Sell;