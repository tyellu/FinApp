import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import Portfolio from "./components/Portfolio/Portfolio";

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={LandingPage} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/portfolio" component={Portfolio}/>
        </div>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
