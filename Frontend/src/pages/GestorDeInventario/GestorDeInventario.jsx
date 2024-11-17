import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";
import "../../design/GestorDeInventario/GestorDeInventario.css";
import logo from "../../design/Logo.png";
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";

const GestorDeInventario = () => {
    const auth = useAuth();
    return (
        <div id="Fondo2">
            <MenuSuperiorGestor/>
            <div id="bottom2">
                <h1 id="txt-OrganizaTusVentas">Gestiona los productos</h1>
                <p id="txt-Portal">PORTAL GESTOR DE INVENTARIO</p>
            </div>
        </div>
    );
};
export default GestorDeInventario;