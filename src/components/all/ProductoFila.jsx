import React from "react";
import "./ProductoFila.css";
import { TiDelete } from "react-icons/ti";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function ProductoFila({ producto, paginaOrigen, onDelete, onAddToCart, onDecreaseQuantity, onIncreaseQuantity, onChangeQuantity }) {
  return (
    <div className="producto-fila">
        <button className="btn btnDelete" onClick={() => onDelete(producto)} title="Eliminar de favoritos">
            <TiDelete size={25} />
        </button>
        {producto.imagen ? (
                <img src={`data:image/png;base64,${producto.imagen}`} alt={producto.titulo} className="producto-fila-img" />
            ) : (
                <img src="/img/no-image.png" alt={producto.titulo} className="producto-fila-img" /> 
            )
        }   
        <div className="producto-fila-info">
            <h3 className="producto-fila-titulo">{producto.titulo}</h3>
            <p className="producto-fila-precio">{producto.precio.toFixed(2)} €</p>
        </div>
        {paginaOrigen == "carrito" ? (
            <div>
                <button className="producto-fila-btn" onClick={() => onDecreaseQuantity(producto)} title="Disminuir cantidad">
                    <FaMinus size={10} />
                </button>
                <input type="number" name="cantidad" placeholder="0" required style={{width:"50px", margin:"10px"}}
                    value={producto.cantidad} onChange={(e) => onChangeQuantity(producto, e.target.value)} className="form-input" min="1" max="20"
                    onFocus={(e) => e.target.select()} />
                <button className="producto-fila-btn" onClick={() => onIncreaseQuantity(producto)} title="Aumentar cantidad">
                    <FaPlus size={10} />
                </button>
            </div>
            ) : (
            <button className="btnIconAndText btnAdd" onClick={() => onAddToCart(producto)} title="Añadir al carrito" style={{width:"auto"}}>
                <FaCartShopping style={{ marginRight: "8px" }} />
                Añadir
            </button>
            )
        }    
    </div>
  );
}

export default ProductoFila;
