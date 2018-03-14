import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './App';
import Portfolio from './Portfolio';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/Portfolio" component={Portfolio}/>
    </div>
  </Router>,
  document.getElementById('root')
);