import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import MainPage from './components/MainPage';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/MainPage" component={MainPage}/>
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker();
