import logo from "../design/Logo.png";
import "./MenuSuperiorAdministrador.css";
import { redireccion } from "./Redireccion"

const MenuSuperiorGestor = () => {
    return (
        <div id="MenuSuperior">
            <img src={logo} className="logo" />
            <h1 id="Nombre" onClick={() => redireccion("/gestorDeInventario")}>Mundos de Tinta</h1>
            <div id="botones">
                <button id="btn-1" type="button"
                    onClick={() => redireccion("/gestorDeInventario/Categorias")}>Categorías</button>
                <button id="btn-2" type="button"
                    onClick={() => redireccion("/gestorDeInventario/Productos")}>Productos</button>
            </div>
        </div>
    );
};
export default MenuSuperiorGestor;        