import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cabecera from '../shared/Cabecera';
import "./CarritoCompra.css";
import ProductoFila from "./ProductoFila";
import { producto_listarActivosFiltroIds } from "../../services/ProductoService";
import { venta_registrar } from "../../services/VentaService";
import { TiDelete } from "react-icons/ti";   //delete icon 
import { FaCartShopping } from "react-icons/fa6"; // Iconos
import Loader from "./Loader";
import ErrorPage from "../error/ErrorPage";

function CarritoCompra() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [fechaEntrega, setFechaEntrega] = useState(null);
  const usuario = localStorage.getItem("TFC_usuario");      // Obtener el usuario
  const usuarioId = localStorage.getItem("TFC_usuarioId");  // Obtener el ID del usuario

  useEffect(() => {
    const variable_carrito = localStorage.getItem("TFC_productosCarrito");
    const carrito = variable_carrito ? JSON.parse(variable_carrito) : []; 
    cargarProductos(carrito);
  }, []);

  function cargarProductos(carrito) {
    var filtro = {
        productosId: carrito.map(item => Number(item.id))
    };
    producto_listarActivosFiltroIds(filtro)
    .then((data) => {
        // Añadimos la propiedad cantidad almacena en localstorage a la lista de productos devuelta por la API:
        const productosConCantidad = data.map(producto => {
          const itemCarrito = carrito.find(item => item.id === producto.id);
          return {
            ...producto,
            cantidad: itemCarrito ? itemCarrito.cantidad : 1, // valor por defecto 1 si no está en el carrito
          };
        });
        setProductos(productosConCantidad); // Guardamos los productos en el estado
        setLoading(false);
    })
    .catch((error) => {
        setError(error.message);
        setLoading(false);
    });
  }

  useEffect(() => {
    calcularImporteTotal()
  }, [productos]);

  function calcularImporteTotal() {
    setTotal(productos.reduce((acumulador, producto) => {
      return acumulador + (producto.precio * producto.cantidad);
    }, 0));
  }

  const handleDelete = (producto) => {
    console.log("Eliminar del carrito: ", producto);
    const variable_carrito = localStorage.getItem("TFC_productosCarrito");
    let carrito = variable_carrito ? JSON.parse(variable_carrito) : []; 
    carrito = carrito.filter(item => item.id !== producto.id);
    localStorage.setItem("TFC_productosCarrito", JSON.stringify(carrito));
    setProductos(prev => prev.filter(p => p.id !== producto.id)); //Actualizar estado sin volver a cargar desde el backend
  };

  const handleDecreaseQuantity = (producto) => {
    console.log("Disminuir cantidad del producto: ", producto);
    const nuevaCantidad = producto.cantidad-1;
    modifyQuantity(producto, nuevaCantidad);
  };

  const handleIncreaseQuantity = (producto) => {
    console.log("Incrementar cantidad del producto: ", producto);
    const nuevaCantidad = producto.cantidad+1;
    modifyQuantity(producto, nuevaCantidad);
  };

  const handleChangeQuantity = (producto, nuevaCantidad) => {
    console.log("Cambiar cantidad del producto: ", producto);
    modifyQuantity(producto, nuevaCantidad);
  };

  function modifyQuantity(producto, nuevaCantidad) {    
    if (nuevaCantidad < 1){
      producto.cantidad = 1;
      alert("La cantidad mínima permitida es 1");
    }
    else if (nuevaCantidad > 20){
      producto.cantidad = 20;
      alert("La cantidad máxima permitida es 20");
    }
    else{
      producto.cantidad = Number(nuevaCantidad);
    }
    const variable_carrito = localStorage.getItem("TFC_productosCarrito");
    let carrito = variable_carrito ? JSON.parse(variable_carrito) : [];
    carrito = carrito.map(item =>
      item.id === producto.id ? { ...item, cantidad: producto.cantidad } : item
    );
    localStorage.setItem("TFC_productosCarrito", JSON.stringify(carrito));
    setProductos(prev =>
      prev.map(p => p.id === producto.id ? { ...p, cantidad: producto.cantidad } : p)
    );
  } 

  const handleVaciar = () => {
      console.log("Eliminar todos los productos del carrito");
      localStorage.setItem("TFC_productosCarrito", []);
      setProductos([]);
  };

  const handleComprar = () => {
    console.log("Ir a realizar comprar");
    if (productos.length == 0)
      return;
    const hoy = new Date();
    const diasExtra = Math.floor(Math.random() * 7) + 1; // Entre 1 y 7
    const entrega = new Date(hoy);
    entrega.setDate(hoy.getDate() + diasExtra);
    setFechaEntrega(entrega.toISOString().split('T')[0]);
    setMostrarPopup(true);
  };

  const confirmarCompra = () => {
    let datos = {
      quien: usuario,
      id_usuario: usuarioId,
      fechaEntrega: fechaEntrega,
      totalPrecio: total,
      productos: productos.map(({ id, cantidad, precio }) => ({id_producto: id, cantidad, precio}))
    }
    venta_registrar(datos)
      .then(() => {          
          localStorage.setItem("TFC_productosCarrito", JSON.stringify([]));
          setProductos([]);
          navigate("/compra-confirmada");
      })
      .catch((error) => {
          setError(error.message);
          setLoading(false);
      });
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message="No se pudo cargar el carrito" />;

  return (
    <div id="main-container">
        <Cabecera />
        <h1 className="titulo">Carrito de compra</h1>
        <div>
        {productos.map((producto) => (
          <ProductoFila key={producto.id} producto={producto} paginaOrigen="carrito" 
            onDelete={handleDelete} onDecreaseQuantity={handleDecreaseQuantity}
            onIncreaseQuantity={handleIncreaseQuantity} onChangeQuantity={handleChangeQuantity} />
        ))}
        </div>
        <button title="Eliminar todos los productos del carrito" className="btnIconAndText btnDelete" onClick={() => handleVaciar()}
          style={{width:"auto"}}>
          <TiDelete style={{ marginRight: "8px" }} />
          Vaciar
        </button>
        <button title="Ir a confirmación de compra" className="btnIconAndText btnAdd" onClick={() => handleComprar()}
          style={{width:"auto", marginLeft:"20px"}}>
          <FaCartShopping style={{ marginRight: "8px" }} />
          Comprar
        </button>
        <span className="importeTotal">{total.toFixed(2)} €</span>

        {mostrarPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Confirmar compra</h2>
              <p><strong>Fecha estimada de entrega:</strong> {fechaEntrega}</p>
              <div className="ticket">
                {productos.map((producto) => (
                  <div key={producto.id} className="ticket-item">
                    <span>{producto.titulo}</span>
                    <span>{producto.cantidad} x {producto.precio.toFixed(2)} = {(producto.precio * producto.cantidad).toFixed(2)} €</span>
                  </div>
                ))}
                <hr />
                <div className="ticket-total">
                  <strong>Total: {total.toFixed(2)} €</strong>
                </div>
              </div>
              <div className="popup-buttons">
                <button onClick={() => setMostrarPopup(false)} className="btnCancel">Cancelar</button>
                <button onClick={() => confirmarCompra()} className="btnConfirm">Confirmar</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default CarritoCompra;
