import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
import './sidebar.css';

class MainPage extends Component {

  constructor(props) {
        super(props);
        this.state = { collapsed: true, page:"Dashboard" };
  }

  mouseOver() {
        this.setState({ collapsed: false });
  }

  mouseOut() {
        this.setState({ collapsed: true });
  }

  onMouseClick(page){
      this.setState({page:page});
  }

  render() {
    return <div>
        <div class="wrapper">
            <nav id="sidebar" className={(this.state.collapsed ? "active " : "")}  onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} >
                <div class="sidebar-header">
                    <h3>Fin App</h3>
                    <strong>FA</strong>
                </div>

                <ul class="list-unstyled components">
                    <li> 
                        <Link to={'/'}>
                            <i class="glyphicon glyphicon-home"></i>
                            Home
                        </Link>
                    </li>
                    <li className={(this.state.page==="About" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('About')}>
                            <i class="glyphicon glyphicon-briefcase"></i>
                            About
                        </a>
                    </li>
                    <li className={(this.state.page==="Dashboard" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Dashboard')}>
                            <i class="glyphicon glyphicon-paperclip"></i>
                            Dashboard
                        </a>
                    </li>
                    <li className={(this.state.page==="Portfolio" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Portfolio')}>
                            <i class="glyphicon glyphicon-link"></i>
                            Portfolio
                        </a>
                    </li>
                    <li className={(this.state.page==="Contact" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Contact')}>
                            <i class="glyphicon glyphicon-send"></i>
                            Contact
                        </a>
                    </li>
                    <li className={(this.state.page==="Logout" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Logout')}>
                            <i class="glyphicon glyphicon-log-out"></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>

            <div id="content">
                {(this.state.page==="Portfolio" ? <Portfolio/>  : "")}
                {(this.state.page==="Dashboard" ? <Dashboard/>  : "")}
            </div>
        </div>
    </div>;
  }

}
export default MainPage;