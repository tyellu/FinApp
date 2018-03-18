import React, { Component } from 'react';

import './form.css'

function send2(method, url, data, callback){
    console.log("stocks have been sold");
    /*var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
        else callback(null, JSON.parse(xhr.responseText));
    };
    xhr.open(method, url, true);
    if (!data) xhr.send();
    else{
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }*/
}


class Sell extends Component{

    sell(){
        document.getElementById('sell_form').addEventListener('submit', function(e){
            e.preventDefault();
            //get username
            var username = "vino";
            var symbol = document.getElementById("symbol").value;
            var quantity = document.getElementById("quantity").value;
            document.getElementById("sell_form").reset();
            send2("POST", "/api/portfolio/" + username, {symbol:symbol, quantity:quantity}, function(err, res){

            });
        });
    }

    render() {
        return <div class="container">
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
                </div>
    }
}

export default Sell;