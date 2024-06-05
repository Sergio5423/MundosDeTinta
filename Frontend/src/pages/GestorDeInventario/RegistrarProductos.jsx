import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import "../../design/GestorDeInventario/RegistrarProductos.css"
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const RegistrarProductos = () => {

    return (
        <div>
            <MenuSuperiorGestor />
            <div id="Panel1">
                <div id="contenedor4">
                    <div id="top">
                        <h1 id="txt1">Registrar Productos</h1>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-categoria"></input> {/*Cambiar input por combo box*/}
                            <h2 id="h-categoria">Categoría</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-precioUnitario"></input>
                            <h2 id="h-precioUnitario">Precio Unitario</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-nombre"></input>
                            <h2 id="h-nombre">Nombre</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-unidades"></input> {/*Cambiar input por selector de numeros*/}
                            <h2 id="h-unidades">Unidades</h2>
                        </div>
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <div id="bottom2">
                        <p id="txt-PortalGestorDeInventario">PORTAL GESTOR DE INVENTARIO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegistrarProductos;