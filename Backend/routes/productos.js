const express = require('express');
const router = express.Router();
const productos = require('../services/productos');

/* GET  */
router.get('/', async function(req, res, next) {
  try {
    res.json(await productos.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los productos`, err.message);
    next(err);
  }
});

/* GET BY ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await productos.getById(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al obtener el producto`, err.message);
    next(err);
  }
});

/*POST*/
router.post('/', async function(req, res, next) {
  try {
    res.json(await productos.create(req.body));
  } catch (err) {
    console.error(`Error al agregar el producto`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    console.log("Cantidad Id: ",id);
    console.log("Cantidad Ruta: ",cantidad)
    /*if (id || cantidad === undefined) {
      res.status(400).json({ message: "Faltan datos necesarios para actualizar el producto" });
      return;
    }*/

    const result = await productos.update(id,cantidad);
    return result;
    /*if (result.message === "Producto actualizado") {
      res.json(result);
    } else {
      res.status(404).json(result);
    }*/
  } catch (err) {
    console.error(`Error al actualizar el producto`, err.message);
    next(err);
  }
});



/* DELETE */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await productos.remove(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar el producto`, err.message);
    next(err);
  }
});

module.exports = router;