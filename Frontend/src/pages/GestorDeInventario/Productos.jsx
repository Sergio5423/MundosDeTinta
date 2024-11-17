import logo from "../../design/Logo.png";
import "../../design/GestorDeInventario/Productos.css"
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion"

const Productos = () => {

    const [productos, setProductos] = useState([])
    const [id, setId] = useState('')

    const getProductos = async () => {
        const allProductos = await fetch("http://localhost:3000/productos")
        const productosJson = await allProductos.json()
        setProductos(productosJson.data)
    }

    const handlerDeleteButton = async (id) => {        
        await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE"
        })
        getCategorias();
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
                            <input id="tb-Buscar" type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf" onClick={() => handlerDeleteButton(id)}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={productos}
                        pagination
                        paginationPerPage={5}
                    />
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/productos/registrarProductos")}>
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