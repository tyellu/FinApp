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
        fetch ('/api/health-check')
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
             <div className="lpageContent" style={{height: this.props.height}}>
                <div className="Title">  
                    <h3 style={{color: "green"}}>FinApp</h3>
                    <h1 style={{color: "green"}}>
                        We are a creative group <br/>
                        of people who design <br/>
                        influential brands and <br/>
                        digital experiences.
                    </h1>
                </div>
                <div>
                    <a href="http://localhost:3001/auth/google">
                    <GoogleButton
                    type="light"
                    onClick={() => {this.handleClick()}}
                    />
                    </a>
                </div>
            </div> 
            </Parallax>
          </div>
        );
    }
}

export default withRouter(Header);



