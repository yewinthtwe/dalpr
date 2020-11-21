import React, { Component } from "react";
import { toNumber } from "lodash";
class Relay extends Component {

   render() {
      const { relay } = this.props;

    return   (
      <div className='row'>
        <div className="col-2">
        <p> Lane {toNumber( `${relay.ID}` )+1 } </p>
        </div>
        <div className="col-3">
        <i style={{ cursor: "pointer", fontSize: 20, color: 'blue' }} onClick={ () => this.props.onToggle(relay)} className={this.getBadgeClasses()}>
        {this.showStatus()}
        </i>
        </div>
        </div> 
  );    
  }
    
  getBadgeClasses()
  {
      let classes = 'fa fa-toggle-';
      classes += this.props.relay.VALUE === '0' ? 'off' : 'on';
      return classes;
   }

  showStatus(){
      const { VALUE: status } = this.props.relay;
      return status  === '0' ? ' Closed' : ' Opened' ;
  }

}
export default Relay;



