import { useState, useEffect } from 'react'
import Cabecera from '../shared/Cabecera';
import "./Productos.css";
import SubcategoriasFiltro from "./SubcategoriasFiltro"
import ProductoCard from "./ProductoCard";
import { producto_listarActivosFiltro } from "../../services/ProductoService";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import ErrorPage from "../error/ErrorPage";

function Productos() {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const idCategoria = searchParams.get("idCategoria");
  const grupo = searchParams.get("grupo");

  useEffect(() => {
    var filtro = {
      id_categoria: idCategoria ? parseInt(idCategoria) : null,
      grupo: grupo ?? null,
      subcategorias: null
    };
    cargarProductos(filtro);
  }, [idCategoria]);

  function cargarProductos(filtro) {
    producto_listarActivosFiltro(filtro)
      .then((data) => {
        setProductos(data); // Guardamos los productos en el estado
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  const manejarFiltro = (seleccionadas) => {
    console.log("Filtrar por subcategorías:", seleccionadas);
    var filtro = {
      id_categoria: idCategoria ? parseInt(idCategoria) : null,
      grupo: grupo ?? null,
      subcategorias: seleccionadas.length > 0 ? seleccionadas : null 
    };
    cargarProductos(filtro);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message="No se pudieron cargar los productos" />;

  return (
    <div id="main-container">
        <Cabecera />
        <h1 className="titulo">Productos disponibles</h1>
        <div className="container">
          <div className='productos-filter'>
            <SubcategoriasFiltro idCategoria={idCategoria} grupo={grupo} onChange={manejarFiltro} />
          </div>
          <div className="productos-container">
            {productos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
    </div>
  );
}

export default Productos;
