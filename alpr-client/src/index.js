import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
//import AlprApp from './AlprApp';
// import AlprConfigFormik from './components/AlprConfigFormik';
import NavbarFullHeigh from './components/NavbarFullHeigh';

import { BrowserRouter } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.css";
// import "font-awesome/css/font-awesome.css";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(

    <BrowserRouter>
      {/* <AlprApp /> */}
      <NavbarFullHeigh></NavbarFullHeigh>
      
    </BrowserRouter>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
