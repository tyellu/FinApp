import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/MainPage" component={MainPage}/>
      <Redirect to="/api/auth/google" />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker();
