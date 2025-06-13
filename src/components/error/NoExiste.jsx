import React from "react";
import { Link } from "react-router-dom";

function NoExiste() {
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página no encontrada 😢</h1>
      <p style={styles.text}>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={styles.button}>Volver al inicio</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  heading: {
    fontSize: "2rem",
    color: "#ff4444",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  button: {
    textDecoration: "none",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
  },
};

export default NoExiste;