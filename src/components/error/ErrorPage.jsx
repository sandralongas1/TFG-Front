import React from "react";
import "./ErrorPage.css";
import Cabecera from '../shared/Cabecera';

const ErrorPage = ({ message }) => {
  return (
    <div id="main-container">
        <Cabecera />
        <div className="error-container">
            <div className="error-title">¡Vaya! Ha ocurrido un error</div>
            <div className="error-message">{message || "Algo salió mal. Inténtalo de nuevo más tarde."}</div>
        </div>
    </div>
  );
};

export default ErrorPage;
