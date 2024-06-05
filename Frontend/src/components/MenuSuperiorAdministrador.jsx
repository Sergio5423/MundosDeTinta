import logo from "../design/Logo.png";
import "./MenuSuperiorAdministrador.css";
import { redireccion } from "./Redireccion"

const MenuSuperiorAdministrador = () => {
    return (
        <div id="MenuSuperior">
            <img src={logo} className="logo" />
            <h1 id="Nombre" onClick={() => redireccion("/administrador")}>Mundos de Tinta</h1>
            <div id="botones">
                <button id="btn-1"
                    type="button"
                    onClick={() => redireccion("/administrador/departamentos")}
                >Departamentos</button>
                <button id="btn-2"
                    type="button"
                    onClick={() => redireccion("/administrador/empleados")}>Empleados</button>
            </div>
        </div>
    );
};
export default MenuSuperiorAdministrador;            