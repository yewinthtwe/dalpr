import React, { Component } from 'react';
import Card from './CardUI';

import img1 from '../assets/diamond_logo.png';
import img2 from '../assets/bus.jpg';
import img3 from '../assets/bg-01.jpg';


class Cards extends Component {

    render() { 
        return ( 
<div className="container-fluid d-flex justify-content-center">
<div className="row">
    <div className="col-md-4">
        <Card imgsrc={img1} title="Diamond Logo"></Card>
    </div>
    <div className="col-md-4">
    <Card imgsrc={img2} title="Bus services"></Card>
    </div>
    <div className="col-md-4">
    <Card imgsrc={img3} title="Property management"></Card>
    </div>
</div>
</div>
         );
    }
}
 
export default Cards;