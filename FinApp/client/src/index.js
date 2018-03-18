import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import MainPage from './MainPage';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/MainPage" component={MainPage}/>
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker();
