import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";
import "../../design/Administrador.css";
import logo from "../../design/Logo.png";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";

const Administrador = () => {
    const auth = useAuth();
    return (
        <div>
            <MenuSuperiorAdministrador/>
            <div id="TituloYFecha">
                <h1 id="Analiticas">Analíticas</h1>
            </div>
            <div id="Panel">
                <div id="dv-tabla">
                    <h2 id="txt-empleados*-">Empleados</h2>
                    {/*Tabla Aquí*/}
                </div>
                <div id="dv">
                    <h2 id="txt-ingresos">Ingresos</h2>
                    {/*Ingresos aquí*/}
                </div>
                <div id="dv">
                    <h2>Ventas</h2>
                    {/*Grafica aquí*/}
                </div>
            </div>
            <div id="Panel">
                <div id="dv-tabla">
                    <h2 id="txt-ventas*-">Ventas</h2>
                    {/*Tabla Aquí*/}
                </div>
                <div id="dv">
                    <h2 id="txt-pagos">Pagos</h2>
                    {/*Ingresos aquí*/}
                </div>
                <div id="dv">
                    <h2>Ventas</h2>
                    {/*Grafica aquí*/}
                </div>
            </div>
        </div>
    );
};
export default Administrador;