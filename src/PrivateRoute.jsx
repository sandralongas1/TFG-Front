import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const usuario = localStorage.getItem("TFC_usuarioNombre");
  const userRole = localStorage.getItem("TFC_usuarioRol");

  if (!usuario) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Si el usuario no tiene el rol adecuado, redirige a una página de acceso denegado o alguna ruta por defecto
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children; // Si todo está bien, renderiza la página solicitada
};

export default PrivateRoute;