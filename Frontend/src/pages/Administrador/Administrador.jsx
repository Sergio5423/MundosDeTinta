// Administrador.jsx
import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";
import "../../design/Administrador.css";
import logo from "../../design/Logo.png";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarController, BarElement, PieController, ArcElement } from 'chart.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, PieController, ArcElement);


let Ingresos;

const Administrador = () => {
    const auth = useAuth();

    const [empleados, setEmpleados] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [masvendidos, setMasvendidos] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const getEmpleados = async () => {
        const allEmpleados = await fetch("http://localhost:3000/empleados");
        const empleadosJson = await allEmpleados.json();
        setEmpleados(empleadosJson.data);
    };

    const getVentas = async () => {
        const allVentas = await fetch("http://localhost:3000/ventas");
        const ventasJson = await allVentas.json();
        setVentas(ventasJson.data);
    };

    const getPagos = async () => {
        const allPagos = await fetch("http://localhost:3000/ventas/pagos");
        const pagosJson = await allPagos.json();
        setPagos(pagosJson.data);
    };

    const getMasVendidos = async () => {
        const allMasVendidos = await fetch("http://localhost:3000/ventas/MasVendidos");
        const MasVendidosJson = await allMasVendidos.json();
        setMasvendidos(MasVendidosJson.data);
    };

    const getIngresos = async () => {
        const ingresos = await fetch("http://localhost:3000/ventas/ingresos");
        const ingresosJson = await ingresos.json();
        Ingresos = ingresosJson.data[0].Ingresos;
    };

    const filterVentasByDate = (ventas, startDate, endDate) => {
        return ventas.filter((venta) => {
            const ventaFecha = new Date(venta.fecha);
            return ventaFecha >= startDate && ventaFecha <= endDate;
        });
    };

    const filteredVentas = filterVentasByDate(ventas, startDate, endDate);

    const data = {
        labels: masvendidos.map(item => item.ProductoNombre),
        datasets: [
            {
                data: filteredVentas.map(item => item.vecesvendido), // Usar los datos filtrados
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        getEmpleados();
        getVentas();
        getIngresos();
        getPagos();
        getMasVendidos();
    }, []);

    useEffect(() => {
        const filteredVentas = filterVentasByDate(ventas, startDate, endDate);
        // Actualizar la gráfica si es necesario
    }, [startDate, endDate, ventas]);

    const columnsEmpleados = [
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
    ];

    const columnsVentas = [
        {
            name: "Id",
            selector: row => row.id
        },
        {
            name: "Fecha",
            selector: row => row.fecha
        },
        {
            name: "Cedula Empleado",
            selector: row => row.cedula
        },
        {
            name: "Nombre Empleado",
            selector: row => row.nombreEmpleado
        },
        {
            name: "Nombre Producto",
            selector: row => row.nombreProducto
        },
        {
            name: "Precio Unitario",
            selector: row => row.precio_unitario
        }
    ];

    const columnsMasVendidos = [
        {
            name: "ID",
            selector: row => row.ID
        },
        {
            name: "Nombre del Producto",
            selector: row => row.ProductoNombre
        },
        {
            name: "Veces Vendido",
            selector: row => row.vecesvendido
        }
    ];

    const columnsPagos = [
        {
            name: "Cedula",
            selector: row => row.cedula
        },
        {
            name: "Nombre",
            selector: row => row.nombreEmpleado
        },
        {
            name: "Pago",
            selector: row => row.Pago
        }
    ];

    return (
        <div>
            <MenuSuperiorAdministrador />
            <div id="TituloYFecha">
                <h1 id="Analiticas">Analíticas</h1>
            </div>
            <div id="Panel">
                <div id="dv-tabla">
                    <h2 id="txt-empleados*-">Empleados</h2>
                    <DataTable
                        id="tabla"
                        columns={columnsEmpleados}
                        data={empleados}
                        pagination
                        paginationPerPage={3}
                    />
                </div>
                <div id="dv">
                    <h2 id="txt-ingresos">Productos más vendidos</h2>
                    <DataTable
                        columns={columnsMasVendidos}
                        data={masvendidos}
                        pagination
                        paginationPerPage={2}
                    />
                    <p>Ingresos Totales: ${Ingresos}</p>
                </div>
            </div>

            {/* Sección de Filtro de Fechas */}
            <div>
                <label>Fecha de inicio: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <label>Fecha de fin: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>

            <div id="Panel">
                <div id="dv-tabla">
                    <h2 id="txt-ventas*-">Ventas</h2>
                    <DataTable
                        id="tabla"
                        columns={columnsVentas}
                        data={ventas}
                        pagination
                        paginationPerPage={3}
                    />
                </div>
                <div id="dv">
                    <h2 id="txt-pagos">Pagos</h2>
                    <DataTable
                        columns={columnsPagos}
                        data={pagos}
                        pagination
                        paginationPerPage={3}
                    />
                </div>

            </div>

            <div id="Panel">
                <div id="dv">
                    <h2>Ventas Filtradas</h2>
                    <Bar data={data} options={options} />
                </div>
                <div id="dv">
                    <h2>Ventas Filtradas</h2>
                    <Pie id="graph" data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Administrador;
