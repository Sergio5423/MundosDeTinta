import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/RegistrarVenta.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faCashRegister } from "@fortawesome/free-solid-svg-icons";

const RegistrarVenta = () => {
    return (
        <div className="Fondo">
            <MenuSuperiorVendedor/>
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Productos</h1>
                        <h1 id="txt1">Compras</h1>
                        <div>
                            <input id="tb-Buscar"></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                        {/*Tabla de productos aquí*/}
                        {/*Tabla de compras aquí*/}
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