import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Portfolio extends Component {
   render() {

      return (
         <div>
            <h2>Portfolio</h2>
            <li><Link to={'/'}>Home</Link></li>
         </div>
      );
   }
}
export default Portfolio;