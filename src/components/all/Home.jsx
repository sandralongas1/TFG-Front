import { useNavigate } from "react-router-dom";
import Cabecera from '../shared/Cabecera';
import "./Home.css";

export default function Home() {

  const navigate = useNavigate();
  const usuario = localStorage.getItem("TFC_usuarioNombre"); // Obtener el usuario

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePlantasTropicales = () => {
    navigate("/productos?idCategoria=1");
  };

  const handlePlantasAromaticas = () => {
    navigate("/productos?idCategoria=2");
  };

  const handleConsejos = () => {
    navigate("/consejos");
  };

  return (
    <div id="main-container">
      <Cabecera />

      <section className="frontal">
        <div className="frontal-text">
          <h4>Especialistas en plantas autóctonas y tropicales</h4>
          <p>Venta online, consejos y todo lo que necesitas para cuidar tu jardín.</p>
          {!usuario ? (
            <button id="btnLogin" className="frontal-button" onClick={handleLogin} title="Iniciar sesión">
              Entrar ahora
            </button>
          ) : (
            <p className="frontal-bienvenida">¡Bienvenido, {usuario}!</p>
          )
          }
        </div>
      </section>

      <section className="features container">
        <div className="feature-card" onClick={handlePlantasAromaticas}>
          <h3>Aromaticas</h3>
          <p>Ideales para el clima local y fáciles de mantener.</p>
        </div>
        <div className="feature-card" onClick={handlePlantasTropicales}>
          <h3>Tropicales</h3>
          <p>Exóticas, decorativas y con carácter.</p>
        </div>
        <div className="feature-card" onClick={handleConsejos}>
          <h3>Consejos y Cuidados</h3>
          <p>Guías prácticas para cada etapa del cultivo.</p>
        </div>
      </section>
    </div>
  );
}
