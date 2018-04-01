import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import API from '../../APIService';
import DatePicker from 'material-ui/DatePicker';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    }
  }

  CreateRoom(){
    var roomName = document.getElementById("roomName").value;

  }

  render(){
      return (
        <div className="example" style={{display:"flex",flexDirection:"column"}}>
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
            <TextField id="roomName"  hintText="Enter Room Name" />
            <TextField id="defaulttme"  hintText="Protfolio value to start with" />
            <DatePicker id="expDate" hintText="When should the game end" openToYearSelection={true}/>
            <FlatButton label="Create" onClick={() => console.log("clicked")}/>  
          </Modal>
        </div>
      );
    }
}

export default CreateRoom;