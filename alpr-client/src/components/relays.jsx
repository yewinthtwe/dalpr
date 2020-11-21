import React, { Component } from "react";
import { toast } from 'react-toastify';
//import { toast } from 'react-toastify';
import Relay from "./common/relay";
import { getLaneStatus, setLaneValue } from "../services/laneServices";
import Cards from './Cards';

class Relays extends Component
{
  state = {
    relays: []
  };
 
  async componentDidMount() {
    const { data: relays } = await getLaneStatus();
    relays.length=4;
    this.setState({ relays });
  };

handleOnToggle = async (relay) => {
  if(relay.VALUE === '0')
  relay.VALUE = '1';
  else relay.VALUE = '0';
  const {data: relays} = await setLaneValue (relay.ID, relay.VALUE);
  relays.length=4;
  //const relays = [...this.state.relays];
  
  this.setState({ relays });
};

  render()
  {

    const { length: count } = this.state.relays;
    if (count === 0) toast('IO module controllers are offline! Please check network connection.');
    //console.log('this.state', this.state.relays);
    return ( 
        <div className="row">
        <div className="col">
          <h5> Automatic Lane Barrier - ALB </h5>

          {/* { this.state.relays.map( relay => (
          <Relay
            key={relay.ID}
            relay={relay}
            onToggle={this.handleOnToggle}
          /> )) } */}

{ this.state.relays.map( relay => (
          <Cards
            key={relay.ID}
            relay={relay}
            onToggle={this.handleOnToggle}
          /> )) }
          
          
        </div>
      </div>
    );
  }

}

export default Relays;

