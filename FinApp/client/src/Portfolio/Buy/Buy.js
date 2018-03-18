import React, { Component } from 'react';

import '../../form.css'

function send(method, url, data, callback){
    console.log("stocks have been bought");
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

class Buy extends Component{

    buy(){
        document.getElementById('buy_form').addEventListener('submit', function(e){
            e.preventDefault();
            //get username
            var username = "vino";
            var symbol = document.getElementById("symbol").value;
            var quantity = document.getElementById("quantity").value;
            document.getElementById("buy_form").reset();
            send("POST", "/api/portfolio/" + username, {symbol:symbol, quantity:quantity}, function(err, res){

            });
        });
    }

    render() {
        return <div class="container">
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
                </div>
    }
}

export default Buy;