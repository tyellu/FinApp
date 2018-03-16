import React , { Component } from 'react';
import { Parallax } from 'react-parallax';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import '../css/Header.css';

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
                bgImage={require('../images/BGImg.jpg')}
                bgImageAlt="BackGroimdImage"
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
                    <GoogleButton
                    type="light"
                    onClick={() => {this.handleClick()}}
                    />
                </div>
            </div> 
            </Parallax>
          </div>
        );
    }
}

export default withRouter(Header);



