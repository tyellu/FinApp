import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import '../../styles/css/roomLobby.css';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class RoomLobby extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openCreate: false,
            openJoin: false
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

    render() {
        return (
            <div className="lobby">
                <h3> Rooms </h3>
                <MuiThemeProvider>
                    <Divider />
                    <FlatButton label="Create Room" onClick={() => this.onOpenCreateModal()}/>
                    <FlatButton label="Join Room " onClick={() => this.onOpenJoinModal()}/>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="Never" />
                            <MenuItem value={2} primaryText="Every Night" />
                            <MenuItem value={3} primaryText="Weeknights" />
                            <MenuItem value={4} primaryText="Weekends" />
                            <MenuItem value={5} primaryText="Weekly" />
                        </DropDownMenu>
                    <MuiThemeProvider>
                        <CreateRoom open={this.state.openCreate} onCloseModal={() => this.onCloseCreateModal()}/>
                        <JoinRoom open={this.state.openJoin} onCloseModal={() => this.onCloseJoinModal()}/>
                    </MuiThemeProvider>
                </MuiThemeProvider>
                
            </div>
        )
    }
}

export default RoomLobby;