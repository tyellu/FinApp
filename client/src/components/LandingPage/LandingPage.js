import React, { Component } from 'react';
import Header from './Header';

class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="HContainer" style={{height: "100vh"}}>
          <Header/>
        </div>
      </div>
      
    );
  }
}

export default LandingPage;
