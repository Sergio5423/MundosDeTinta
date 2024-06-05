import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Registros = () => {

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
                        {/*Tabla aquí*/}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Registros;