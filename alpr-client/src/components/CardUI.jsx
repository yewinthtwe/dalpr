import React from 'react';
import './card-styles.css';

const Card = props => {
    //console.log(props);
return (
    <div className="card text-center shadow">
        {/* <div className="overflow">
            <img src={props.imgsrc} alt="imageOne" className="card-img-top"/>
        </div> */}
        <div className="card-body text-dark">
            <h4 className="card-title">{props.title}</h4>
            {/* <p className="card-text text-secondary" /> */}
            <dl className="row">
                <dt className="col-sm-8">In Time</dt>
                    <dd className="col-sm-40">{props.data.inTime}</dd>
                <dt className="col-sm-8">In Photo</dt>
                    <dd className="col-sm-40">{props.data.inPhoto}</dd>
                <dt className="col-sm-4">Out Time</dt>
                    <dd className="col-sm-40">{props.data.outTime}</dd>
                <dt className="col-sm-8">Out Photo</dt>
                    <dd className="col-sm-40">{props.data.outPhoto}</dd>
            </dl>
             <button onClick={props.onSubmit} className="btn btn-outline-success">GoBack</button>
        </div>
    </div>
);
}
export default Card;