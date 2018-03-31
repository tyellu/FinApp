import React, { Component } from 'react';
import API from '../APIService';



class Sell extends Component{

    sell(){
        let sellQuantity = document.getElementById("sellQuantity").value;
        API.removeFromPortfolio(this.props.symbol, sellQuantity).then((res) => {
            this.props.refresh();
        });
    }

    render() {
        return <div >
            <form >
                <input type="number" id="sellQuantity" style={{width: 70}} max={this.props.quantity} min="0"/>
                <button type="button" style={{width: 70}} onClick={() => this.sell()}>Sell</button>
            </form>
        </div>
    }
}

export default Sell;