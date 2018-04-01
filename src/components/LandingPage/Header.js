import React , { Component } from 'react';
import { Parallax } from 'react-parallax';
import GoogleButton from 'react-google-button';
import {withRouter} from "react-router-dom";

import '../../styles/css/Header.css';

class Header extends Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        fetch ('https://api-marketsim.herokuapp.com/api/health-check')
          .then(response => console.log(response.body));
    }

    render() {
        return (
          <div className="Hpage">
            <Parallax
                blur={10}
                bgImage={require('../../images/BGImg.jpg')}
                bgImageAlt="BackgroundImage"
                strength={400}
            >
             <div className="lpageContent" style={{height: "100vh"}}>
                 <div className="landing-box">
                     <div className="Title">
                         <h3>FinApp</h3>
                         <h1>
                             Create, manage and simulate <br/>
                             stock trading and portfolio <br/>
                             management. Set up a room<br/>
                             and compete with friends.
                         </h1>
                     </div>
                     <div className="google-button">
                         <a href="https://api-marketsim.herokuapp.com/auth/google">
                             <GoogleButton
                                 type="light"
                                 onClick={() => {this.handleClick()}}
                             />
                         </a>
                     </div>
                 </div>
            </div> 
            </Parallax>
          </div>
        );
    }
}

export default withRouter(Header);



