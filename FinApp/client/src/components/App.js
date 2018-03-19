import React, { Component } from 'react'; // eslint-disable-next-line
import logo from '../logo.svg';
import Header from './Header';
import Info from './Info';
import '../css/App.css';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    console.log("width: " + this.state.width);
    console.log("height: " + this.state.height);
    return (
      <div className="App">
        <div className="HContainer" style={{height: this.state.height}}>
          <Header height={this.state.height} />
        </div>
        <div className="IContainer" style={{height: this.state.height}}>
          <Info />
        </div>
      </div>
      
    );
  }
}

export default App;
