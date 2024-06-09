import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/RegistrarVenta.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const RegistrarVenta = () => {

    const [productos, setProductos] = useState([])
    const [id, setId] = useState('')
    const [cedula, setCedula] = useState('')
    const [facturaId, setFacturaId] = useState('')


    const getProductos = async () => {
        const allProductos = await fetch("http://localhost:3000/productos")
        const productosJson = await allProductos.json()
        setProductos(productosJson.data)
    }

    const handlerBuyButton = async (e, id, cedula, facturaId) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/ventas/nuevaVenta/${id}/${cedula}/${facturaId}`, {
            method: "POST"
        })
    }


    useEffect(() => {
        let numeroAleatorio = Math.floor(Math.random() * 9000000000) + 1000000000;
        setFacturaId(numeroAleatorio);
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
                    <form onSubmit={(e) => handlerBuyButton(e, id, cedula, facturaId)}>
                        <div id="top">
                            <h1 id="txt1">Productos</h1>

                            <div>
                                <input id="tb-Buscar" type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Cedula Empleado"></input>
                                <input id="tb-Buscar" type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                                <button id="btn-Buscar">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                                </button>
                                <button id="btn-Inf">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                                </button>
                            </div>
                        </div>
                        <div id="middle">
                            <DataTable
                                id="tabla"
                                columns={columns}
                                data={productos}
                                pagination
                                paginationPerPage={5}
                            />
                        </div>
                        <div id="bottom">
                            <div>
                                <button id="btn-Inf">
                                    <FontAwesomeIcon icon={faCashRegister} style={{ color: "#dce1e5", }} />
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};
export default RegistrarVenta;