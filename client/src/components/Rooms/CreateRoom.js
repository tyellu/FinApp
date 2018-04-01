import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import API from '../../APIService';
import DatePicker from 'material-ui/DatePicker';
import '../../styles/css/createRoom.css';
import moment from 'moment';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName:'',
      defaultAmt: '',
      expDate: null,
      newRoom: '',
    };
  }

  CreateRoom(){
    var roomName = this.state.roomName;
    var defaultAmt = Number(this.state.defaultAmt);
    var expDate = moment(this.state.expDate, "YYYY-MM-DD").toDate();
    if(roomName === '' || defaultAmt === '' || expDate === null){
        alert("fields cannot be empty");
    }else{
      //call the api service format the way we want
      API.createRoom(roomName,defaultAmt,expDate)
        .then(newRoom => 
          {
            if(newRoom){
              this.setState({
                roomName:'',
                defaultAmt: '',
                expDate: null,
                newRoom : newRoom,
              });
              console.log(newRoom);
            }else{
              alert("Failed to create a room. This might be because the roomName is taken. Please Try again with another Name");
              this.setState({
                roomName:'',
                defaultAmt: '',
                expDate: null,
              });
            }
            
            this.props.onCloseModal();
        })
        .catch(err => console.log(err));
      

    }
  }

  handleCreateRoomChange = (event) => {
    this.setState({
      roomName: event.target.value,
    });
  };

  handleDefaultAmtChange = (event) =>{
    this.setState({
      defaultAmt: event.target.value,
    });
  };

  handleDateChange = (err, date) =>{
    this.setState({
      expDate: date
    });
  };


  render(){
      return (
        <div className="createModal" >
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
            <div className="createForm" >
              <TextField id="roomName" value={this.state.roomName} onChange={this.handleCreateRoomChange} hintText="Enter Room Name" />
              <TextField id="defaultAmt" value={this.state.defaultAmt} onChange={this.handleDefaultAmtChange} hintText="Protfolio value to start with" />
              <DatePicker id="expDate" value={this.state.expDate}  onChange={this.handleDateChange} hintText="When should the game end" openToYearSelection={true}/>
              <RaisedButton label="Create" primary={true} disabled={this.state.buttonDisabled} onClick={() => this.CreateRoom()}/>
            </div>
          </Modal>
        </div>
      );
    }
}

export default CreateRoom;