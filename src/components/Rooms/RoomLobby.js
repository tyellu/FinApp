import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import '../../styles/css/roomLobby.css';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import API from '../../APIService';
import Subheader from 'material-ui/Subheader';

class RoomLobby extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openCreate: false,
            openJoin: false,
            rooms: [],
            value: ''
        };
    }
   
    onOpenCreateModal = () => {
        this.setState({ openCreate: true });
    };
   
    onCloseCreateModal = () => {
      this.setState({ openCreate: false });
    };

    onOpenJoinModal(){
        this.setState({openJoin:true});
    }

    onCloseJoinModal(){
        this.setState({openJoin: false});
    }

    createMenuItem(room){
        return (<MenuItem value={room} key={room} primaryText={room}/>);
    }

    componentDidMount() {
        this.getRooms();
    }

    getRooms() {
        API.getMyRooms()
        .then((res) => {
            this.setState({ rooms: res || []});
        }).catch(e => console.log(e));
    }

    handleChange = (event, key, value) => {
        this.props.history.push('/room/' + value);
    };

    render() {
        return (
            <div className="lobby">
                <h3> Rooms </h3>
                <MuiThemeProvider>
                    <div id="elements">
                        <Divider />
                        <FlatButton label="Create Room" onClick={() => this.onOpenCreateModal()}/>
                        <FlatButton label="Join Room " onClick={() => this.onOpenJoinModal()}/>
                        <Divider/>
                        <Subheader>Your Rooms</Subheader>
                        <Divider/>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange} 
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        iconStyle={{fill:"black"}}
                        underlineStyle={{borderTop: "5px solid rgb(224, 224, 224)"}}
                        >
                            {this.state.rooms.map((room) => { return this.createMenuItem(room);})}
                        </DropDownMenu>
                    </div>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <CreateRoom open={this.state.openCreate} onCloseModal={() => this.onCloseCreateModal()}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <JoinRoom open={this.state.openJoin} onCloseModal={() => this.onCloseJoinModal()}/>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withRouter(RoomLobby);