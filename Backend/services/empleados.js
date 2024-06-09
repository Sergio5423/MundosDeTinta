const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT e.cedula, e.nombre, e.fechaNac, e.direccion, e.telefono, d.nombre 
    AS Departamento
    FROM empleados e 
    INNER JOIN departamentos d
    ON e.fk_departamentos_id = d.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(empleado){
  const result = await db.query(
    `INSERT INTO empleados 
    (cedula,nombre,fechaNac,direccion,telefono,fk_departamentos_id)
    VALUES
    ("${empleado.cedula}","${empleado.nombre}",'${empleado.fechaNac}',"${empleado.direccion}","${empleado.telefono}",(SELECT id FROM departamentos WHERE nombre="${empleado.Dnombre}"));`
  );

  let message = 'Error al agregar el empleado';

  if (result.affectedRows) {
    message = 'Empleado agregado';
  }

  return {message};
}

async function update(cedula, empleado){
  const result = await db.query(
    `UPDATE empleados 
    SET cedula="${empleado.cedula}", nombre="${empleado.nombre}", fechaNac='${empleado.fechaNac}', direccion="${empleado.direccion}", telefono ="${empleado.telefono}", fk_departamentos_id=${empleado.fk_departamentos_id}
    WHERE cedula="${cedula}";` 
  );

  let message = 'Error al actualizar el empleado';

  if (result.affectedRows) {
    message = 'Empleado actualizado';
  }

  return {message};
}

async function remove(cedula){
  const result = await db.query(
    `DELETE FROM empleados WHERE cedula="${cedula}"`
  );

  let message = 'Error al eliminar al empleado';

  if (result.affectedRows) {
    message = 'Empleado eliminado';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create, update, remove,
}