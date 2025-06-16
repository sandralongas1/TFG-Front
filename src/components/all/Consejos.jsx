import React from "react";
import Cabecera from '../shared/Cabecera';
import "./Consejos.css";

const consejos = [
  {
    titulo: "Riego adecuado",
    descripcion: "Evita el exceso de agua. La mayoría de las plantas prefieren que la tierra se seque ligeramente entre riegos.",
  },
  {
    titulo: "Luz solar",
    descripcion: "Coloca tus plantas donde reciban la cantidad de luz adecuada según su tipo. Algunas prefieren luz directa y otras indirecta.",
  },
  {
    titulo: "Fertilización",
    descripcion: "Usa abono natural o fertilizante específico cada cierto tiempo para aportar nutrientes y fortalecer el crecimiento.",
  },
  {
    titulo: "Podas regulares",
    descripcion: "Recorta hojas secas o dañadas para estimular un desarrollo saludable y prevenir plagas.",
  },
  {
    titulo: "Cambio de maceta",
    descripcion: "Trasplanta tus plantas cada 1-2 años para renovar la tierra y dar espacio a las raíces.",
  },
];

const Consejos = () => {
  return (
    <div id="main-container">
        <Cabecera />
        <div className="consejos-container">
        <h1 className="titulo-principal">Consejos y cuidados de plantas</h1>
        <div className="grid-consejos">
            {consejos.map((consejo, index) => (
            <div key={index} className="card-consejo">
                <h2>{consejo.titulo}</h2>
                <p>{consejo.descripcion}</p>
            </div>
            ))}
        </div>
        </div>
    </div>
    
  );
};

export default Consejos;
