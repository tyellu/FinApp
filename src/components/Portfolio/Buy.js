import React, { Component } from 'react';
import API from '../../APIService';
import '../../styles/css/Buy.css'

class Buy extends Component{
    constructor(props) {
        super(props);
        this.state = {
            price: "",
            total: ""
        };
    }

    refreshTotal() {
        let buyQuantity = Number(document.getElementById("quantityField").value);
        this.setState({total: this.state.price * buyQuantity});
    }

    buy(){
        let buyQuantity = Number(document.getElementById("quantityField").value);
        let buySymbol = document.getElementById("symbolField").value;
        this.props.buy(buyQuantity, buySymbol);
    }

    getQuote() {
        let symbol = document.getElementById("symbolField").value;
        if (symbol)
            API.getQuote(symbol).then((res) => {
                this.setState({price: res});
                this.refreshTotal();
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="buy-group">
                <div className="stock-group">
                    <span>
                        <span>Symbol: </span>
                        <input type="text" id="symbolField" required onBlur={() => this.getQuote()}/>
                    </span>
                    <span>
                        <span>Price: </span>
                        <span>{this.state.price? `$${this.state.price.toFixed(2)}` : ""}</span>
                    </span>
                </div>
                <div className="quantity-group">
                    <span>
                        <span>Quantity: </span>
                        <input type="number" id="quantityField" required placeholder="0" min="0" onChange={() => this.refreshTotal()}/>
                    </span>
                    <span>
                        <span>Total: </span>
                        <span>{this.state.total? `$${this.state.total.toFixed(2)}` : ""}</span>
                    </span>
                </div>
                <button type="button" className="buy-button" onClick={() => this.buy()}>Buy Shares</button>
            </div>
        )
    }
}

export default Buy;