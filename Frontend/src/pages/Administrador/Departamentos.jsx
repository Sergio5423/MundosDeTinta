import "../../design/Departamentos.css"
import logo from "../../design/Logo.png";
import { redireccion } from "../../components/Redireccion"
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const Departamentos = () => {

    const [departamento, setDepartamentos] = useState([])

    const getDepartamentos = async () => {
        const allDepartamentos = await fetch("http://localhost:3000/departamentos")
        const departamentosJson = await allDepartamentos.json()
        setDepartamentos(departamentosJson.data)
    }

    useEffect(() => {
        getDepartamentos()
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
            name: "Funcion",
            selector: row => row.funcion
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Departamentos</h1>
                        <div>
                            <input id="tb-Buscar"></input> {/*Cambiar tb buscar por combo box departamento*/}
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button> {/*cambiar btn buscar por btn agregar*/}
                        </div>
                    </div>
                    <div>
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={departamento}
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
export default Departamentos;