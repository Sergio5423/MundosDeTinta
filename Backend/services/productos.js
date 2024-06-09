const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT p.id, p.nombre, p.cantidad, p.precio_unitario, p.fecha_entrada, c.nombre
    AS categoria
    FROM productos p 
    INNER JOIN categorias c
    ON p.fk_categorias_id=c.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getById(id) {  
  const row = await db.query(
    `SELECT p.id, p.nombre, p.precio_unitario, c.nombre
    AS Categoría
    FROM productos p 
    INNER JOIN categorias c
    ON p.fk_categorias_id=c.id WHERE p.id=${id};`
  );
  const data = helper.emptyOrRows(row);

  return {
    data
  };
}

async function create(producto) {
  const result = await db.query(
    `INSERT INTO productos 
    (nombre,cantidad,precio_unitario,fecha_entrada,fk_categorias_id)
    VALUES
    ("${producto.nombre}",${producto.cantidad},${producto.precio_unitario},'${producto.fecha_entrada}',(SELECT id FROM categorias WHERE nombre="${producto.Cnombre}"));`
  );

  let message = "Error al agregar el producto";

  if (result.affectedRows) {
    message = "Producto agregado";
  }

  return { message };
}

async function update(id, producto) {
  const result = await db.query(
    `UPDATE productos 
    SET nombre="${producto.nombre}", cantidad=${producto.cantidad}, precio_unitario=${producto.precio_unitario}, fecha_entrada ='${producto.fecha_entrada}', fk_categorias_id=${producto.fk_categorias_id}
    WHERE id=${id};`
  );

  let message = "Error al actualizar el producto";

  if (result.affectedRows) {
    message = "Producto actualizado";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM productos WHERE id=${id}`
  );

  let message = "Error al eliminar el producto";

  if (result.affectedRows) {
    message = "Producto eliminado";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
