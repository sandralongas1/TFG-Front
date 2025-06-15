import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/UsuarioService";
import Cabecera from './shared/Cabecera';
import "./Login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {    
      setLoading(true);

      var datos = {
        usuario: usuario,
        clave: password
      }

      login(datos).then((data) => {
        if (data.usuario) {
          localStorage.setItem("TFC_usuarioId", `${data.id}`);
          localStorage.setItem("TFC_usuario", `${data.usuario}`);
          localStorage.setItem("TFC_usuarioNombre", `${data.nombre} ${data.apellidos}`);
          localStorage.setItem("TFC_usuarioRol", data.perfil);
          let productosFav = localStorage.getItem("TFC_productosFavoritos");
          if (!productosFav){
              localStorage.setItem("TFC_productosFavoritos", []);
          }
          let carrito = localStorage.getItem("TFC_productosCarrito");
          if (!carrito){
              localStorage.setItem("TFC_productosCarrito", []);
          }
          setMensaje("✅ Login exitoso");
  
          setTimeout(() => {
              // if (data.perfil == "ADMIN"){
              //     navigate("/admin/usuarios");
              // }else{
              //     navigate("/user/home");
              // }
              navigate("/");
          }, 600);      
        } 
        else {
          setMensaje("❌ Usuario o contraseña incorrectos");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error al conectar con la API", error);
      setMensaje("⚠️ Error al conectar con el servidor");
    }
  };

  if (loading) return <p>Cargando sesión...</p>;

  return (
    <div>
      <Cabecera />
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Iniciar sesión</h2>
          <input
            type="text"
            placeholder="Usuario o correo electrónico"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
          <div className="registro">
            <Link to="/registroUsuario">
              Si aún no tienes cuenta ¡ Regístrate !
            </Link>
          </div>
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </form>            
      </div>
    </div>
  );
}
