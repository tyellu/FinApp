import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

class Portfolio extends Component {

  constructor(props) {
        super(props);
        this.state = { collapsed: true };
    }

  mouseOver() {
      console.log('print');
        this.setState({ collapsed: false });
  }

  mouseOut() {
        this.setState({ collapsed: true });
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
                    <li>
                        <Link to={'/About'}>
                            <i class="glyphicon glyphicon-briefcase"></i>
                            About
                        </Link>
                    </li>
                    <li class="active">
                        <Link to={'/Portfolio'}>
                            <i class="glyphicon glyphicon-link"></i>
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link to={'/FAQ'}>
                            <i class="glyphicon glyphicon-paperclip"></i>
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Contact'}>
                            <i class="glyphicon glyphicon-send"></i>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Logout'}>
                            <i class="glyphicon glyphicon-log-out"></i>
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>

            <div id="content">
              
            </div>
        </div>

    </div>;
  }

}
export default Portfolio;