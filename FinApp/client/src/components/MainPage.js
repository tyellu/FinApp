import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
import '../css/sidebar.css';

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
        <div className="wrapper">
            <nav id="sidebar" className={(this.state.collapsed ? "active " : "")}  onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} >
                <div className="sidebar-header">
                    <h3>Fin App</h3>
                    <strong>FA</strong>
                </div>

                <ul className="list-unstyled components">
                    <li> 
                        <Link to={'/'}>
                            <i className="glyphicon glyphicon-home"></i>
                            Home
                        </Link>
                    </li>
                    <li className={(this.state.page==="About" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('About')}>
                            <i className="glyphicon glyphicon-briefcase"></i>
                            About
                        </a>
                    </li>
                    <li className={(this.state.page==="Dashboard" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Dashboard')}>
                            <i className="glyphicon glyphicon-paperclip"></i>
                            Dashboard
                        </a>
                    </li>
                    <li className={(this.state.page==="Portfolio" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Portfolio')}>
                            <i className="glyphicon glyphicon-link"></i>
                            Portfolio
                        </a>
                    </li>
                    {/*<li className={(this.state.page==="Contact" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Contact')}>
                            <i className="glyphicon glyphicon-send"></i>
                            Contact
                        </a>
                    </li>*/}
                    <li className={(this.state.page==="Logout" ? "active " : "")}>
                        <a onClick={()=>this.onMouseClick('Logout')}>
                            <i className="glyphicon glyphicon-log-out"></i>
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