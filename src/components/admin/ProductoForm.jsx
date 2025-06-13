import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { subcategoria_listarActivosFiltro } from "../../services/SubcategoriaService";
import { obtenerProducto, crearProducto, editarProducto } from "../../services/ProductoService";
import Cabecera from "../shared/Cabecera";
import "../shared/Form.css";

export default function ProductoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState({
        id: 0,
        quien: "",
        activo: true,
        titulo: "",        
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
        id_subcategoria: null
    }); 
    const [subcategorias, setSubcategorias] = useState([]);
    const [imagenBase64, setImagenBase64] = useState(""); // solo base64
    const [previewUrl, setPreviewUrl] = useState("");     // para mostrar la imagen

    useEffect(() => {
        subcategoria_listarActivosFiltro({})
            .then((data) => {
                setSubcategorias(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

        if (id) {
            setLoading(true);
            obtenerProducto(id)
                .then((data) => {
                    data.id_subcategoria = data.subcategoria.id;
                    setProducto(data);
                    if (data.imagen) {
                        setImagenBase64(data.imagen); // guarda base64 puro por si no cambia
                        setPreviewUrl(`data:image/png;base64,${data.imagen}`); // vista previa
                    }
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
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const productoConImagen = {
            ...producto,
            imagen: imagenBase64 || producto.imagen, // usa la nueva si hay, sino la que ya estaba
          };

        const accion = id ? editarProducto : crearProducto;
        accion(productoConImagen)
            .then(() => {
                navigate("/admin/productos");
            })
            .catch((error) => console.error(error));
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fullDataUrl = reader.result; // data:image/png;base64,...
                const base64Solo = fullDataUrl.split(",")[1];

                setPreviewUrl(fullDataUrl);      // para <img />
                setImagenBase64(base64Solo);     // para enviar a la API
            };
            reader.readAsDataURL(file); // Convierte a base64
        }
    };

    if (loading) return <p>Cargando datos del producto...</p>;

    return (
        <div id="main-container">
            <Cabecera />

            <div className="form-container">
                <h2 className="form-title">
                    {id ? "Editar Producto" : "Crear Producto"}
                </h2>

                <form onSubmit={handleSubmit} className="form">
                <input type="text" name="titulo" placeholder="Titulo" required
                    value={producto.titulo} onChange={handleChange} className="form-input" />
                <input type="text" name="descripcion" placeholder="Descripción" required
                    value={producto.descripcion} onChange={handleChange} className="form-input" />
                <input type="number" name="precio" placeholder="Precio" required
                    value={producto.precio} onChange={handleChange} className="form-input" />
                <input type="number" name="stock" placeholder="Stock" required
                    value={producto.stock} onChange={handleChange} className="form-input" />
                
                <select name="id_subcategoria" required value={producto.id_subcategoria} onChange={handleChange} className="form-input">
                    {subcategorias.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                            {sc.categoria}-{sc.descripcion}
                        </option>
                    ))}
                </select>

                <input type="file" accept="image/*" onChange={handleImagenChange} />
                {previewUrl && (
                    <div>
                    <p>Vista previa:</p>
                    <img src={previewUrl} alt="Vista previa" style={{ maxWidth: "200px" }} />
                    </div>
                )}

                <button type="submit" className="form-button">
                    {id ? "Actualizar" : "Crear"}
                </button>
                </form>
            </div>
        </div>
    );
}
