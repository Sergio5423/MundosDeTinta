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
    const [dataForm, SetDataForm] = useState({})

    const getProductos = async () => {
        const allProductos = await fetch("http://localhost:3000/productos")
        const productosJson = await allProductos.json()
        setProductos(productosJson.data)
    }

    const handlerBuy = async (e, id) => {
        e.preventDefault();       
        await fetch(`http://localhost:3000/ventas/nuevaVenta/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
            
        })
        await fetch(`http://localhost:3000/productos/${id}`, {
            method: "PUT",
        })
        getProductos();
    }

    const handlerFormInput = (e) => {
        SetDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }

    useEffect(() => {
        let numeroAleatorio = Math.floor(Math.random() * 9000000000) + 1000000000;
        numeroAleatorio = numeroAleatorio.toString()
        SetDataForm(prevDataForm => ({ ...prevDataForm, facturaId: numeroAleatorio }));
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
            name: "Categoría",
            selector: row => row.categoria
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorVendedor />
            <div id="Panel1">
                <div id="contenedor1">
                    <form onSubmit={(e) => handlerBuy(e, id)}>
                        <div id="top">
                            <h1 id="txt1">Productos</h1>

                            <div>
                                <input id="tb-Buscar" type="text" value={dataForm.cedula} onChange={handlerFormInput}  name="cedula" placeholder="Cedula Empleado"></input>

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