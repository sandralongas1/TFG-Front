import { useEffect, useState } from "react";
import { subcategoria_listarActivosFiltro } from "../../services/SubcategoriaService";
import Loader from "./Loader";
import ErrorPage from "../error/ErrorPage";

const SubcategoriasFiltro = ({ idCategoria, grupo, onChange }) => {
  const [subcategorias, setSubcategorias] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    var filtro = {
        id_categoria: idCategoria ? parseInt(idCategoria) : null,
        grupo: grupo ?? null
      };
    cargarSubcategorias(filtro);
  }, [idCategoria, grupo]);

  function cargarSubcategorias(filtro) {
    subcategoria_listarActivosFiltro(filtro)
      .then((data) => {
        setSubcategorias(data); // Guardamos los subcategorias en el estado
        setSeleccionadas([])
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  const manejarCambio = (idSubcategoria) => {
    let nuevasSeleccionadas;
    if (seleccionadas.includes(idSubcategoria)) {
      nuevasSeleccionadas = seleccionadas.filter((id) => id !== idSubcategoria);
    } else {
      nuevasSeleccionadas = [...seleccionadas, idSubcategoria];
    }
    setSeleccionadas(nuevasSeleccionadas);
    onChange?.(nuevasSeleccionadas); // Notifica al padre si lo desea
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPage message="No se pudieron cargar las subcategorias" />;

  return (
    <div className="filtro-subcategorias">
      <h3>Categorías</h3>
      <ul style={{ maxHeight: "300px", overflowY: "auto", paddingLeft: "0" }}>
        {subcategorias.map((subcategoria) => (
          <li key={subcategoria.id} style={{ listStyle: "none", marginBottom: "8px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={seleccionadas.includes(subcategoria.id)}
                onChange={() => manejarCambio(subcategoria.id)}
              />
              <span style={{ marginLeft: "10px" }}>{subcategoria.descripcion}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoriasFiltro;
