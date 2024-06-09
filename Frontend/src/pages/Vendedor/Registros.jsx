import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const Registros = () => {


    const [ventas, setVentas] = useState([])

    const getVentas = async () => {
        const allVentas = await fetch("http://localhost:3000/ventas")
        const ventasJson = await allVentas.json()
        setVentas(ventasJson.data)
    }

    useEffect(() => {
        getVentas()
    }, [])

    const columns = [
        {
            name: "Id",
            selector: row => row.id
        },
        {
            name: "Fecha",
            selector: row => row.fecha
        },
        {
            name: "Cedula Empleado",
            selector: row => row.cedula
        },
        {
            name: "Nombre Empleado",
            selector: row => row.nombreEmpleado
        },
        {
            name: "Nombre Producto",
            selector: row => row.nombreProducto
        },
        {
            name: "Precio Unitario",
            selector: row => row.precio_unitario
        }
    ]

    return (

        <div className="Fondo">
            <MenuSuperiorVendedor />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Ventas</h1>
                        <div>
                            <input id="tb-Buscar"></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>

                    </div>
                    <div>
                        <DataTable
                            columns={columns}
                            data={ventas}
                            pagination
                            paginationPerPage={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Registros;