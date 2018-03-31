import React, { Component } from 'react'; // eslint-disable-next-line
import Header from './Header';
import Info from './Info';
import '../../styles/css/App.css';

class LandingPage extends Component {
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
    return (
      <div className="App">
        <div className="HContainer" style={{height: this.state.height}}>
          <Header height={this.state.height} />
        </div>
        <div className="IContainer" style={{height: this.state.height}}>
          <Info height={this.state.height}/>
        </div>
      </div>
      
    );
  }
}

export default LandingPage;
