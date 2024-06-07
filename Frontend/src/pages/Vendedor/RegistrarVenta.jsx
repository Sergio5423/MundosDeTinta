import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/RegistrarVenta.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const RegistrarVenta = () => {

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
            name: "Precio Unitario",
            selector: row => row.precio_unitario
        },
        {
            name: "Categoría",
            selector: row => row.categoria
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorVendedor />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Compras</h1>
                        <div>
                            <input id="tb-Buscar"></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <div id="middle">
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={productos}
                        />
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faCashRegister} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegistrarVenta;