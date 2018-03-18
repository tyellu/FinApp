import React, { Component } from 'react';
import API from '../../APIService';
import '../../form.css'

const Myusername = 'testAmine';

class Sell extends Component{

    sell(){
        var sellQuantity = document.getElementById("sellQuantity").value;
        API.removeFromPortfolio(Myusername, this.props.symbol, sellQuantity).then((res) => {
            this.props.refresh();
        });
    }

    render() {
        return <div className="ptable-form">
            <form className="inline-form">
                <label for="staticEmail2">
                    <span className="ptable-cell">Sell: {this.props.symbol}</span>
                    <span className="ptable-cell">at: {this.props.price}</span>
                    <span className="ptable-cell">| Quantity:</span> </label>
                <input className="ptable-cell" type="number" id="sellQuantity" max={this.props.quantity} min="0"/>
                <button type="submit" className="btn btn-primary mb-2 ptable-cell" onClick={() => this.sell()}>Sell</button>
            </form>
        </div>
    }
}

export default Sell;