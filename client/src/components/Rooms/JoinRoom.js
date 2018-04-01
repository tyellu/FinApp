import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import API from '../../APIService';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class JoinRoom extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rooms:[],
          value: ''
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, index, value){
      this.setState({value});
      
  }

  joinRoom(){
      API.joinRoom(this.state.value).then((res) => {
        console.log("Joined room");
        this.props.onCloseModal();
      });
  }

  componentDidMount() {
      this.getRooms();
  }

  getRooms() {
      API.getAllRooms().then((res) => {
        this.setState({ rooms: res});
      });
  }

  createMenuItem(room) {
        return (<MenuItem value={room.name} key={room.name}primaryText={room.name} />);
  }

  render(){
      return (
        <div className="example">
          <Modal
            open={this.props.open}
            onClose={this.props.onCloseModal}
            little
            classNames={{
              transitionEnter: 'transition-enter',
              transitionEnterActive: 'transition-enter-active',
            }}
            animationDuration={1000}
            closeIconSize={15}
          >
            <DropDownMenu value={this.state.value} onChange={this.handleChange}
              iconStyle={{fill:"black"}}
            >
                { this.state.rooms.map((room) => { return this.createMenuItem(room);}) }
            </DropDownMenu>
            <br/>
            <RaisedButton label="Join" primary={true} onClick={() => this.joinRoom()}/>  
          </Modal>
        </div>
      );
    }
}

export default JoinRoom;