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
        /*<div class="container">
                    <h2>Sell Stocks</h2>
                    <form id="sell_form" class="column">
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
                                <button type="submit" class="btn btn-default" onClick={this.sell.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>*/
    }
}

export default Sell;