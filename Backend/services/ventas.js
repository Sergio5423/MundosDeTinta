const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT v.id, v.fecha, e.cedula AS Cedula_Empleado, v.id_factura, p.nombre AS Producto, p.precio_unitario
    FROM
    ventas v
    INNER JOIN
    empleados e
    ON e.cedula=fk_empleados_cedula 
    INNER JOIN productos p
    ON v.fk_productos_id=p.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(venta){
  const result = await db.query(
    `INSERT INTO ventas 
    (fecha,fk_empleados_cedula,id_factura,fk_productos_id)
    VALUES
    ('${venta.fecha}',"${venta.fk_empleados_cedula}","${venta.id_factura}",${venta.fk_prductos_id});`
  );

  let message = 'Error al agregar la venta';

  if (result.affectedRows) {
    message = 'Venta agregada';
  }

  return {message};
}

async function update(id, venta){
  const result = await db.query(
    `UPDATE ventas 
    SET fecha='${venta.fecha}', fk_empleados_cedula="${venta.fk_empleados_cedula}", id_factura="${venta.id_factura}", fk_productos_id=${venta.fk_productos_id}
    WHERE id=${id};` 
  );

  let message = 'Error al actualizar la venta';

  if (result.affectedRows) {
    message = 'Venta actualizada';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM ventas WHERE id=${id}`
  );

  let message = 'Error al eliminar la venta';

  if (result.affectedRows) {
    message = 'Venta eliminada';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create, update, remove,
}