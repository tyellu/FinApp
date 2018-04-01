import React, { Component } from 'react';
import API from '../../APIService';

class Sell extends Component{

    sell(){
        const sellQuantity = document.getElementById("sellQuantity-" + this.props.symbol).value;
        console.log(sellQuantity);
        API.makeNewTransaction(this.props.symbol, sellQuantity, "sell").then((res) => {
            this.props.refresh();
        });
    }

    render() {
        return <form className="sell-group">
                <input type="number" id={ `sellQuantity-${this.props.symbol}` } style={{width: 70}} max={this.props.quantity} min="0"/>
                <button type="button" style={{width: 70}} onClick={() => this.sell()}>Sell</button>
            </form>
    }
}

export default Sell;