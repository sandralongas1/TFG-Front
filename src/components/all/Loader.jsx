import React from "react";
import "./Loader.css";
import Cabecera from '../shared/Cabecera';

const Loader = () => {
  return (
    <div id="main-container">
        <Cabecera />
        <div className="loader-container">
            <div className="spinner" />
        </div>
    </div>   
  );
};

export default Loader;
