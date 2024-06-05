const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,nombre,funcion 
    FROM departamentos`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(departamento) {
  const result = await db.query(
    `INSERT INTO departamentos 
    (nombre,funcion) 
    VALUES 
    ('${departamento.nombre}', '${departamento.funcion}')`
  );

  let message = "Error al agregar el departamento";

  if (result.affectedRows) {
    message = "Departamento agregado";
  }

  return { message };
}

async function update(id, departamento) {
  const result = await db.query(
    `UPDATE departamentos 
    SET nombre='${departamento.nombre}', funcion='${departamento.funcion}'
    WHERE id=${id}`
  );

  let message = "Error al actualizar el departamento";

  if (result.affectedRows) {
    message = "Departamento actualizado";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM departamentos WHERE id=${id}`);

  let message = "Error eliminando el departamento";

  if (result.affectedRows) {
    message = "Departamento eliminado";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
