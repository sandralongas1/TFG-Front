import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { perfil_listar } from "../../services/PerfilService";
import { obtenerUsuario, crearUsuario, editarUsuario } from "../../services/UsuarioService";
import Cabecera from "../shared/Cabecera";
import "../shared/Form.css";
import Loader from "../all/Loader";

export default function UsuarioForm({rol}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        id: 0,
        quien: "",
        activo: true,
        nombre: "",        
        apellidos: "",
        dni: "",
        telf: "",
        direccion: "",
        email: "",
        usuario: "",
        clave: "",
        imagen: null,
        id_perfil: 2
    });
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        perfil_listar()
            .then((data) => {
                setRoles(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

        if (id) {
            setLoading(true);
            obtenerUsuario(id)
                .then((data) => {
                    data.id_perfil = data.perfil.id;
                    setUsuario(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const accion = id ? editarUsuario : crearUsuario;
        accion(usuario)
            .then(() => {
                if (rol) {
                    navigate("/")
                }else{
                    navigate("/admin/usuarios")
                }              
            })
            .catch((error) => console.error(error));
    };

    if (loading) return <Loader />;

    return (
        <div id="main-container">
            <Cabecera />

            <div className="form-container">
                <h2 className="form-title">
                    {rol && "Registro"}
                    {!rol && id && "Editar Usuario"}
                    {!rol && !id && "Crear Usuario"}
                </h2>

                <form onSubmit={handleSubmit} className="form">
                <input type="text" name="nombre" placeholder="Nombre" required
                    value={usuario.nombre} onChange={handleChange} className="form-input" />
                <input type="text" name="apellidos" placeholder="Apellidos" required
                    value={usuario.apellidos} onChange={handleChange} className="form-input" />
                <input type="text" name="dni" placeholder="DNI" required
                    value={usuario.dni} onChange={handleChange} className="form-input" />
                <input type="text" name="telf" placeholder="Teléfono" required
                    value={usuario.telf} onChange={handleChange} className="form-input" />
                <input type="text" name="direccion" placeholder="Dirección" required
                    value={usuario.direccion} onChange={handleChange} className="form-input" />
                <input type="email" name="email" placeholder="Email" required
                    value={usuario.email} onChange={handleChange} className="form-input" />
                <input type="text" name="usuario" placeholder="Nombre de usuario" required
                    value={usuario.usuario} onChange={handleChange} className="form-input" />
                <input type="password" name="clave" placeholder="Contraseña" required
                    value={usuario.clave} onChange={handleChange} className="form-input" />
                
                {!rol && (
                    <select name="id_perfil" required value={usuario.id_perfil} onChange={handleChange} className="form-input">
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                                {rol.descripcion}
                            </option>
                        ))}
                    </select>
                )}

                <button type="submit" className="form-button">
                    {id ? "Actualizar" : "Crear"}
                </button>
                </form>
            </div>
        </div>
    );
}
