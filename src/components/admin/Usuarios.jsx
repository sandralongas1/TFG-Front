import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Cabecera from "../shared/Cabecera";
import { TiDelete } from "react-icons/ti";   //delete icon 
import { MdModeEdit } from "react-icons/md"; //edit icon
import { FaUserPlus } from "react-icons/fa"; //add icon
import { usuario_listar, eliminarUsuario } from "../../services/UsuarioService";
import Loader from "../all/Loader";
import ErrorPage from "../error/ErrorPage";

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function cargarUsuarios() {
    usuario_listar()
      .then((data) => {
        setUsuarios(data); // Guardamos los usuarios en el estado
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  if (loading) return <Loader />;
  if (error) return <ErrorPage message="No se pudieron cargar los usuarios" />;

  const borrarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de que quieres borrar este usuario?')) {
      console.log(`Usuario con ID ${id} eliminado`);

      eliminarUsuario(id)
        .then((data) => {
          cargarUsuarios(); // recargo llamando nuevamente a listar
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });

    }
  };

  const crearUsuario = () => {
    navigate(`/admin/usuario_crear`);
  };

  const editarUsuario = (id) => {
    navigate(`/admin/usuario_editar/${id}`);
  };

  return (
    <div id ="main-container">
      <Cabecera />
      <div className="user-container">
        <h2>Lista de Usuarios</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.perfil.descripcion}</td>
                <td>
                  <div id="acciones">
                    <button onClick={() => borrarUsuario(usuario.id)} className="btn btnDelete" title="Borrar usuario"> 
                      <TiDelete size={25} />
                    </button>
                    <button onClick={() => editarUsuario(usuario.id)} className="btn btnEdit" title="Editar usuario"> 
                      <MdModeEdit size={25} />
                    </button>
                  </div> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button title="Dar de alta un usuario" className="btnIconAndText btnAdd" onClick={() => crearUsuario()}>
          <FaUserPlus style={{ marginRight: "8px" }} />
          Añadir usuario
        </button>
      </div>      
    </div>
  );
}

export default Usuarios;
