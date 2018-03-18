import React, { Component } from 'react';

import '../../form.css'
import API from '../../APIService';

class Buy extends Component{
    constructor(props) {
        super(props);
        this.state = {
            price: "",
            total: ""
        };
    }

    refreshTotal() {
        var buyQuantity = document.getElementById("quantityField").value;
        this.setState({total: this.state.price * buyQuantity});
    }

    buy(){
        var buyQuantity = document.getElementById("quantityField").value;
        var buySymbol = document.getElementById("symbolField").value;
        API.addToPortfolio(buySymbol, buyQuantity).then((res) => {
            this.props.refresh();
        });
    }

    getQuote() {
        var symbol = document.getElementById("symbolField").value;
        API.getQuote(symbol).then((res) => {
            this.setState({price: res});
            this.refreshTotal();
        }).catch(err => console.log(err));
    }

    render() {
        return <form>
            <div className="form-group row">
                <label for="symbolField" className="col-sm-2 col-form-label">Symbol: </label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="symbolField" required onBlur={() => this.getQuote()}/>
                </div>
                <label for="priceField" className="col-sm-2 col-form-label">Price: </label>
                <div className="col-sm-4">
                    <input type="text" readOnly className="form-control-plaintext" id="priceField" value={this.state.price}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="quantityField" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-4">
                    <input type="number" className="form-control" id="quantityField" required placeholder="0" min="0" onChange={() => this.refreshTotal()}/>
                </div>
                <label for="totalField" className="col-sm-2 col-form-label">Total: </label>
                <div className="col-sm-4">
                    <input type="text" readOnly className="form-control-plaintext" id="totalField" value={this.state.total}/>
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => this.buy()}>Buy</button>
        </form>
    }
}

export default Buy;