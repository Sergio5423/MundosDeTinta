import logo from "../../design/Logo.png";
import "../../design/GestorDeInventario/Productos.css"
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion"

const Productos = () => {

    const [categorias, setCategorias] = useState([])
    const [id, setId] = useState('')

    const getCategorias = async () => {
        const allCategorias = await fetch("http://localhost:3000/categorias")
        const categoriasJson = await allCategorias.json()
        setCategorias(categoriasJson.data)
    }

    const handlerDeleteButton = async (id) => {        
        await fetch(`http://localhost:3000/categorias/${id}`, {
            method: "DELETE"
        })
        getCategorias();
    }

    useEffect(() => {
        getCategorias()
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
            name: "Tipo",
            selector: row => row.tipo
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorGestor />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Categorías</h1>
                        <div>
                            <input id="tb" type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                            <button id="btn-Inf" onClick={() => handlerDeleteButton(id)}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/categorias/actualizarCategoria")}>
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={categorias}
                        pagination
                        paginationPerPage={5}
                    />
                    <div id="bottom">
                        <div>                            
                            <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/categorias/registrarCategoria")}>
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