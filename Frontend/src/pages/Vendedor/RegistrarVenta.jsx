import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/RegistrarVenta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMagnifyingGlass,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const [dataForm, setDataForm] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const getProductos = async () => {
    const allProductos = await fetch("http://localhost:3000/productos");
    const productosJson = await allProductos.json();
    setProductos(productosJson.data);
  };

  const handlerBuy = async (e) => {
    e.preventDefault();
    const { cedulaEmpleado, cedulaCliente } = dataForm;
    const selectedProducts = selectedRows.map((row) => ({
      id: row.id,
      cantidad: selectedQuantities[row.id] || 1, // Default to 1 if no quantity selected
    }));
  
    if (!cedulaEmpleado || !cedulaCliente || selectedProducts.length === 0) {
      alert("Por favor, completa todos los campos y selecciona al menos un producto.");
      return;
    }
  
    const payload = {
      ced_empleado: cedulaEmpleado,
      ced_cliente: cedulaCliente,
      productos: selectedProducts,
      facturaId: dataForm.facturaId,
    };
  
    //console.log(payload); // Verificar el payload en la consola
  
    if (window.confirm("¿Estás seguro de que deseas registrar esta venta?")) {
      const response = await fetch(`http://localhost:3000/ventas/nuevaVenta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        for (const product of selectedProducts) {
          await fetch(`http://localhost:3000/productos/${product.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cantidad: product.cantidad }),
          });
        }
          
        alert("¡Venta registrada exitosamente!");
      } else {
        alert("Error al registrar la venta");
      }
    }
  };
  

  const handlerFormInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let numeroAleatorio = Math.floor(Math.random() * 9000000000) + 1000000000;
    numeroAleatorio = numeroAleatorio.toString();
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      facturaId: numeroAleatorio,
    }));
    getProductos();
  }, []);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleQuantityChange = (id, value) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [id]: value,
    });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Cantidad",
      cell: (row) => (
        <input
          type="number"
          min="1"
          value={selectedQuantities[row.id] || 1}
          onChange={(e) => handleQuantityChange(row.id, e.target.value)}
        />
      ),
    },
    {
      name: "Precio Unitario",
      selector: (row) => row.precio_unitario,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
    },
  ];

  return (
    <div className="Fondo">
      <MenuSuperiorVendedor />
      <div id="Panel1">
        <div id="contenedor1">
          <form onSubmit={handlerBuy} id="formTabla">
            <div id="top">
              <h1 id="txt1">Registrar venta</h1>
              <div>
                <input
                  id="tb-Buscar"
                  type="text"
                  value={dataForm.cedulaEmpleado || ""}
                  onChange={handlerFormInput}
                  name="cedulaEmpleado"
                  placeholder="Cédula Empleado"
                />
                <input
                  id="tb-Buscar"
                  type="text"
                  value={dataForm.cedulaCliente || ""}
                  onChange={handlerFormInput}
                  name="cedulaCliente"
                  placeholder="Cédula Cliente"
                />
                <input
                  id="tb-Buscar"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
                <button id="btn-Buscar" type="button">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "#dce1e5" }}
                  />
                </button>
                <button id="btn-Inf" type="button">
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#dce1e5" }}
                  />
                </button>
              </div>
            </div>

            <DataTable
              id="tabla"
              className="custom-table"
              columns={columns}
              data={productos}
              pagination
              paginationPerPage={10}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
            />
          </form>
          <div id="bottom">
            <button id="btn-Inf" onClick={handlerBuy}>
              <FontAwesomeIcon
                icon={faCashRegister}
                style={{ color: "#dce1e5" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarVenta;
