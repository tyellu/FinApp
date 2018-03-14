import React, { Component } from 'react'; // eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        my app

        <li><Link to={'/Portfolio'}>Portfolio</Link></li>

      </div>
    );
  }
}

export default App;
