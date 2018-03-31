import React , { Component } from 'react';
import '../css/info.css';

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
              Vestibulum ut arcu convallis justo vulputate tristique. Nunc facilisis sed ipsum quis eleifend. Fusce non gravida orci, 
              sit amet gravida arcu. Suspendisse nec purus enim. Vivamus eget justo volutpat, porta est vitae, gravida arcu. 
              Suspendisse euismod ex non mi efficitur tincidunt. Quisque finibus, quam quis laoreet sollicitudin, 
              justo lectus vulputate justo, quis pellentesque velit augue sit amet turpis. Nullam dapibus ornare malesuada.
              Mauris condimentum, ex vel rhoncus scelerisque, velit lectus elementum leo, nec imperdiet lorem est eu tortor. 
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
              Vestibulum ut arcu convallis justo vulputate tristique. Nunc facilisis sed ipsum quis eleifend. Fusce non gravida orci, 
              sit amet gravida arcu. Suspendisse nec purus enim. Vivamus eget justo volutpat, porta est vitae, gravida arcu. 
              Suspendisse euismod ex non mi efficitur tincidunt. Quisque finibus, quam quis laoreet sollicitudin, 
              justo lectus vulputate justo, quis pellentesque velit augue sit amet turpis. Nullam dapibus ornare malesuada.
              Mauris condimentum, ex vel rhoncus scelerisque, velit lectus elementum leo, nec imperdiet lorem est eu tortor. 
              </div> 
          </div> 
        );
    }
}

export default Info;