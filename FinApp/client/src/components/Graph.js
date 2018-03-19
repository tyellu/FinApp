import React, { Component } from 'react';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: ""
        };
    }

    render() {
        return <div>Graph {this.props.symbol}</div>
    }
}

export default Graph;