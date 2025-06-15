import { useNavigate } from "react-router-dom";
import "./CompraConfirmada.css"; // Opcional para estilos
import Cabecera from '../shared/Cabecera';

function CompraConfirmada() {
  const navigate = useNavigate();

  return (
    <div id="main-container">
        <div className="confirmacion-container">
            <Cabecera />
            <h1>¡Gracias por tu compra!</h1>
            <button className="btnVolver" onClick={() => navigate("/")}>
                Volver al inicio
            </button>
        </div>
    </div>
  );
}

export default CompraConfirmada;