import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Cabecera from "../shared/Cabecera";
import { TiDelete } from "react-icons/ti";   //delete icon 
import { MdModeEdit } from "react-icons/md"; //edit icon
import { FaUserPlus } from "react-icons/fa"; //add icon
import { producto_listar, eliminarProducto } from "../../services/ProductoService";

function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  function cargarProductos() {
    producto_listar()
      .then((data) => {
        setProductos(data); // Guardamos los productos en el estado
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  const borrarProducto = (id) => {
    if (window.confirm('¿Estás seguro de que quieres borrar este producto?')) {
      console.log(`Producto con ID ${id} eliminado`);

      eliminarProducto(id)
        .then((data) => {
          cargarProductos(); // recargo llamando nuevamente a listar
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });

    }
  };

  const crearProducto = () => {
    navigate(`/admin/producto_crear`);
  };

  const editarProducto = (id) => {
    navigate(`/admin/producto_editar/${id}`);
  };

  return (
    <div id ="main-container">
      <Cabecera />
      <div className="user-container">
        <h2>Lista de Productos</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.titulo}</td>
                <td>{producto.precio}€</td>
                <td>{producto.stock}</td>
                <td>
                  <div id="acciones">
                    <button onClick={() => borrarProducto(producto.id)} className="btn btnDelete" title="Borrar producto"> 
                      <TiDelete size={25} />
                    </button>
                    <button onClick={() => editarProducto(producto.id)} className="btn btnEdit" title="Editar producto"> 
                      <MdModeEdit size={25} />
                    </button>
                  </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button title="Dar de alta un producto" className="btnIconAndText btnAdd" onClick={() => crearProducto()}>
          <FaUserPlus style={{ marginRight: "8px" }} />
          Añadir producto
        </button>
      </div>      
    </div>
  );
}

export default Productos;
