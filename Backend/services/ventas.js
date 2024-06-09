const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT v.id, v.fecha, e.cedula, e.nombre AS nombreEmpleado, v.id_factura, p.nombre AS nombreProducto, p.precio_unitario
    FROM
    ventas v
    INNER JOIN
    empleados e
    ON e.cedula=fk_empleados_cedula 
    INNER JOIN productos p
    ON v.fk_productos_id=p.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getIngresos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT SUM(p.precio_unitario) AS Ingresos
    FROM
    ventas v        
    INNER JOIN productos p
    ON v.fk_productos_id=p.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getPagos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT e.cedula, e.nombre AS nombreEmpleado, SUM(p.precio_unitario)*0.20 AS Pago
    FROM
    ventas v
    INNER JOIN
    empleados e
    ON e.cedula=fk_empleados_cedula 
    INNER JOIN productos p
    ON v.fk_productos_id=p.id
    GROUP BY e.cedula`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getMasVendidos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT p.id AS ID, p.nombre AS ProductoNombre, COUNT(p.id) AS vecesvendido FROM ventas v INNER JOIN productos p ON v.fk_productos_id=p.id 
    GROUP BY ProductoNombre, ID ORDER BY COUNT(p.id) DESC;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(id, venta) {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  const result = await db.query(
    `INSERT INTO ventas 
    (fecha,fk_empleados_cedula,id_factura,fk_productos_id)
    VALUES
    ("${fechaFormateada}","${venta.cedula}","${venta.facturaId}",${id});`
  );

  let message = "Error al agregar la venta";

  if (result.affectedRows) {
    message = "Venta agregada";
  }

  return { message };
}

async function update(id, venta) {
  const result = await db.query(
    `UPDATE ventas 
    SET fecha='${venta.fecha}', fk_empleados_cedula="${venta.fk_empleados_cedula}", id_factura="${venta.id_factura}", fk_productos_id=${venta.fk_productos_id}
    WHERE id=${id};`
  );

  let message = "Error al actualizar la venta";

  if (result.affectedRows) {
    message = "Venta actualizada";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM ventas WHERE id=${id}`);

  let message = "Error al eliminar la venta";

  if (result.affectedRows) {
    message = "Venta eliminada";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getIngresos,
  getPagos,
  getMasVendidos,
};
