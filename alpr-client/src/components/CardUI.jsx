import React from 'react';
import './card-styles.css';

const Card = props => {
    //console.log(props);
return (
    <div className="card text-center shadow">
        <div className="overflow">
            <img src={props.imgsrc} alt="imageOne" className="card-img-top"/>
        </div>
        <div className="card-body text-dark">
            <h4 className="card-title">{props.title}</h4>
            {/* <p className="card-text text-secondary" /> */}
            <dl className="row">
                <dt className="col-sm-4">Time</dt>
                    <dd className="col-sm-20">{props.data.Time}</dd>
            </dl>
             <button onClick={props.onSubmit} className="btn btn-outline-success">GoBack</button>
        </div>
    </div>
);
}
export default Card;