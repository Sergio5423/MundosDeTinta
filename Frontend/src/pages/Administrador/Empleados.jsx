import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

/*function EmpleadosItems({ cedula, nombre, fechaNac, direccion, telefono, departamento }) {
    return (
        <article>
            <p>Cedula: {cedula}</p>
            <p>Nombre: {nombre}</p>
            <p>fechaNac: {fechaNac}</p>
            <p>Direccion: {direccion}</p>
            <p>Telefono: {telefono}</p>
            <p>Departamento: {departamento}</p>
        </article>
    )
}
*/
const Empleados = () => {
    const [empleados, setEmpleados] = useState([])

    const getEmpleados = async () => {
        const allEmpleados = await fetch("http://localhost:3000/empleados")
        const empleadosJson = await allEmpleados.json()
        setEmpleados(empleadosJson.data)
        console.log(empleadosJson.data)
    }

    useEffect(() => {
        getEmpleados()
    })

    const columns = [
        {
            name: "Cedula",
            selector: row => row.cedula
        },
        {
            name: "Nombre",
            selector: row => row.nombre
        },
        {
            name: "fechaNac",
            selector: row => row.fechaNac
        },
        {
            name: "Direccion",
            selector: row => row.direccion
        },
        {
            name: "Telefono",
            selector: row => row.telefono
        },
        {
            name: "Departamento",
            selector: row => row.Departamento
        }
    ]

    const data = [
        {
			cedula: "10123123",
			nombre: "us2",
			fechaNac: "2000-10-30T05:00:00.000Z",
			direccion: "asdsdas",
			telefono: "3002541135",
			Departamento: "contabilidad"
		},
		{
			cedula: "1082833501",
			nombre: "us1",
			fechaNac: "2000-10-30T05:00:00.000Z",
			direccion: "asdsdas",
			telefono: "3002541135",
			Departamento: "contabilidad"
		}
    ]

    return (

        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Empleados</h1>
                        <div>
                            <input id="tb-Buscar"></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <div>
                        {/*tabla aquí*/}
                        <DataTable
                            columns={columns}
                            data={empleados}
                        />
                    </div>
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
export default Empleados;