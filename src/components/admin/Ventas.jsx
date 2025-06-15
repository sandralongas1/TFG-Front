import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";
import Cabecera from "../shared/Cabecera";
import { venta_listar } from "../../services/VentaService";

function Ventas() {
  const { usuarioId } = useParams();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarVentas();
  }, [usuarioId]);

  function cargarVentas() {
    let filtros = {
      id_usuario: usuarioId == 0 ? null : usuarioId,
      fechaMin: null,
      fechaMax: null
    }
    venta_listar(filtros)
      .then((data) => {
        setVentas(data); // Guardamos los ventas en el estado
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id ="main-container">
      <Cabecera />
      <div className="user-container">
        <h2>Lista de Ventas</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Fecha entrega</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.fechaEntrega}</td>
                <td>{venta.estado}</td>
                <td>{venta.totalPrecio.toFixed(2)} €</td>
                <td>{venta.user_nombre} {venta.user_apellidos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
    </div>
  );
}

export default Ventas;
