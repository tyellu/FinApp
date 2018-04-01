import React , { Component } from 'react';
import '../../styles/css/info.css';

class Info extends Component {
    render() {
        const height = this.props.height - 50;
        return (
          <div className="info">
              <div className="what" style={{height: height}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante rutrum consectetur finibus. 
              Quisque iaculis in nisl in porttitor. In bibendum facilisis augue. Donec non consequat nulla, 
              et hendrerit justo. Suspendisse volutpat lectus id dolor dapibus, sed lobortis nunc commodo. 
              Nulla quis orci sed mi imperdiet hendrerit nec dignissim quam. Etiam fermentum sed orci nec fermentum.
              Phasellus eu mollis sem. Etiam sed ullamcorper est, a finibus sapien. Mauris pellentesque ex et urna porttitor, 
              sed mollis massa mattis.
              Nunc viverra nunc nibh, et vulputate mauris imperdiet consectetur. Cras et sem vel enim efficitur dignissim vel in ligula.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
              Donec vitae aliquet magna, at varius nibh. Vivamus eget ipsum ac ligula fermentum posuere sed at ante.
              Vestibulum ut arcu convallis justo vulputate tristique. Nunc facilisis sed ipsum quis eleifend.
              </div>
              <br/>
              <div className="who" style={{height: height}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante rutrum consectetur finibus. 
              Quisque iaculis in nisl in porttitor. In bibendum facilisis augue. Donec non consequat nulla, 
              et hendrerit justo. Suspendisse volutpat lectus id dolor dapibus, sed lobortis nunc commodo. 
              Nulla quis orci sed mi imperdiet hendrerit nec dignissim quam. Etiam fermentum sed orci nec fermentum.
              Phasellus eu mollis sem. Etiam sed ullamcorper est, a finibus sapien. Mauris pellentesque ex et urna porttitor, 
              sed mollis massa mattis.
              Nunc viverra nunc nibh, et vulputate mauris imperdiet consectetur. Cras et sem vel enim efficitur dignissim vel in ligula.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
              Donec vitae aliquet magna, at varius nibh. Vivamus eget ipsum ac ligula fermentum posuere sed at ante.
              Vestibulum ut arcu convallis justo vulputate tristique. Nunc facilisis sed ipsum quis eleifend.
              </div> 
          </div> 
        );
    }
}

export default Info;