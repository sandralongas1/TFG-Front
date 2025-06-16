import { Link } from "react-router-dom";
import Cabecera from '../shared/Cabecera';
import "./Home.css";

export default function Home() {

  const usuario = localStorage.getItem("TFC_usuarioNombre"); // Obtener el usuario

  return (
    <div id="main-container">
      <Cabecera />

      <section className="frontal">
        <div className="frontal-text">
          <h4>Especialistas en plantas autóctonas y tropicales</h4>
          <p>Venta online, consejos y todo lo que necesitas para cuidar tu jardín.</p>
          {!usuario ? (
            <Link to="/login" className="frontal-button">Entrar ahora</Link>
          ) : (
            <p className="frontal-bienvenida">¡Bienvenido, {usuario}!</p>
          )
          }
        </div>
      </section>

      <section className="features container">
        <div className="feature-card">
          {/* <img src="../../../public/img/" alt="Autóctonas" /> */}
          <h3>Aromaticas</h3>
          <p>Ideales para el clima local y fáciles de mantener.</p>
        </div>
        <div className="feature-card">
          {/* <img src="/assets/plantas2.jpg" alt="Tropicales" /> */}
          <h3>Tropicales</h3>
          <p>Exóticas, decorativas y con carácter.</p>
        </div>
        <div className="feature-card">
          {/* <img src="/assets/plantas3.jpg" alt="Consejos" /> */}
          <h3>Consejos y Cuidados</h3>
          <p>Guías prácticas para cada etapa del cultivo.</p>
        </div>
      </section>
    </div>
  );
}
