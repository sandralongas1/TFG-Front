import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/all/Home';
import Login from './components/Login';
import Productos from './components/all/Productos'
import ProductoDetalle from "./components/all/ProductoDetalle";
import AdminCategorias from './components/admin/Categorias';
import AdminSubcategorias from './components/admin/Subcategorias';
import AdminProductos from './components/admin/Productos';
import AdminUsuarios from './components/admin/Usuarios';
import AdminVentas from './components/admin/Ventas';
import ProductoForm from './components/admin/ProductoForm';
import UsuarioForm from './components/admin/UsuarioForm';
import PrivateRoute from "./PrivateRoute";
import AccesoDenegado from "./components/error/AccesoDenegado"; // Página de acceso denegado
import NoExiste from "./components/error/NoExiste"; // Página de ruta no existe
import ProductosFavoritos from './components/all/ProductosFavoritos';
import CarritoCompra from './components/all/CarritoCompra';
import UsuarioPerfil from './components/all/UsuarioPerfil';
import CompraConfirmada from './components/all/CompraConfirmada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registroUsuario" element={<UsuarioForm rol="USER" />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/productosFavoritos" element={<ProductosFavoritos />} />
        <Route path="/carrito" element={<CarritoCompra />} />
        <Route path="/perfil" element={<UsuarioPerfil />} />
        <Route path="/compra-confirmada" element={<CompraConfirmada />} />

        <Route path="/admin/categorias" element={<PrivateRoute role="ADMIN"><AdminCategorias /></PrivateRoute>} />
        <Route path="/admin/subcategorias" element={<PrivateRoute role="ADMIN"><AdminSubcategorias /></PrivateRoute>} />

        <Route path="/admin/productos" element={<PrivateRoute role="ADMIN"><AdminProductos /></PrivateRoute>} />
        <Route path="/admin/producto_crear" element={<PrivateRoute role="ADMIN"><ProductoForm /></PrivateRoute>} />
        <Route path="/admin/producto_editar/:id" element={<PrivateRoute role="ADMIN"><ProductoForm /></PrivateRoute>} />

        <Route path="/admin/usuarios" element={<PrivateRoute role="ADMIN"><AdminUsuarios /></PrivateRoute>} />
        <Route path="/admin/usuario_crear" element={<PrivateRoute role="ADMIN"><UsuarioForm /></PrivateRoute>} />
        <Route path="/admin/usuario_editar/:id" element={<PrivateRoute role="ADMIN"><UsuarioForm /></PrivateRoute>} />

        <Route path="/admin/ventas/:usuarioId" element={<AdminVentas />} />

        {/* Ruta para acceso denegado */}
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />

        {/* Captura rutas no existentes */}
        <Route path="*" element={<NoExiste />} /> 
      </Routes>
    </Router>
  );
}

export default App;
