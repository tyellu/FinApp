import React, { Component } from 'react';
import Buy from './Buy';
import Sell from './Sell';

class Portfolio extends Component{
    render() {
        return <div>
                   <Buy/>
                   <Sell/>
               </div>
    }
}

export default Portfolio;