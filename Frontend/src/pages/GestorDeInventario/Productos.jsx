import logo from "../../design/Logo.png";
import "../../design/GestorDeInventario/Productos.css"
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const Productos = () => {

    const [productos, setProductos] = useState([])

    const getProductos = async () => {
        const allProductos = await fetch("http://localhost:3000/productos")
        const productosJson = await allProductos.json()
        setProductos(productosJson.data)
    }

    useEffect(() => {
        getProductos()
    }, [])

    const columns = [
        {
            name: "Id",
            selector: row => row.id
        },
        {
            name: "Nombre",
            selector: row => row.nombre
        },
        {
            name: "Cantidad",
            selector: row => row.cantidad
        },
        {
            name: "Precio Unitario",
            selector: row => row.precio_unitario
        },
        {
            name: "Fecha de Entrada",
            selector: row => row.fecha_entrada
        },
        {
            name: "Categoría",
            selector: row => row.categoria
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorGestor />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Productos</h1>
                        <div>
                            <input id="tb-Buscar"></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={productos}
                    />
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Productos;