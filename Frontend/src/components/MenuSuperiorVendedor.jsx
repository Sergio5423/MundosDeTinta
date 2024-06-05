import logo from "../design/Logo.png";
import "./MenuSuperiorAdministrador.css";
import { redireccion } from "./Redireccion"

const MenuSuperiorVendedor = () => {
    return (
        <div id="MenuSuperior">
            <img src={logo} className="logo" />
            <h1 id="Nombre" onClick={() => redireccion("/vendedor")}>Mundos de Tinta</h1>
            <div id="botones">
                <button id="btn-1" type="button"
                    onClick={() => redireccion("/vendedor/registrarVenta")}>Ventas</button>
                <button id="btn-2" type="button"
                    onClick={() => redireccion("/vendedor/registros")}>Registros</button>
            </div>
        </div>
    );
};
export default MenuSuperiorVendedor;  