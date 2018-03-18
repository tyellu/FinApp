import React, { Component } from 'react';

import '../../form.css'
import API from '../../APIService';

const Myusername = 'testAmine';

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
        API.addToPortfolio(Myusername, buySymbol, buyQuantity).then((res) => {
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




        /*<form>
            <div className="form-group">
                <label for="exampleInputEmail1">Symbol: </label>
                <input type="text" className="form-control" placeholder="Enter Symbol"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Quantity: </label>
                <input type="number" className="form-control" placeholder="Quantity"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>*/

        /*<div class="container">
                    <h2>Buy Stocks</h2>
                    <form id="buy_form" class="column">
                        <div class="form-group">
                            <label class="col-sm-2" >Symbol</label>
                            <div class="col-xs-6">
                                <input class="form-control" id="symbol" placeholder="Enter symbol" name="symbol" required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2">Quantity</label>
                            <div class="col-xs-6">          
                                <input class="form-control" id="quantity" placeholder="Enter Quantity" name="quantity" required/>
                            </div>
                        </div>
                        <div class="form-group">        
                            <div class="col-sm-offset-2 col-sm-2">
                                <button type="submit" class="btn btn-default" onClick={this.buy.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>*/
    }
}

export default Buy;