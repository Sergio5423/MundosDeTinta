const express = require('express');
const router = express.Router();
const ventas = require('../services/ventas');

/* GET  */
router.get('/', async function(req, res, next) {
  try {
    res.json(await ventas.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener las ventas`, err.message);
    next(err);
  }
});

/*POST*/
router.post('/', async function(req, res, next) {
  try {
    res.json(await ventas.create(req.body));
  } catch (err) {
    console.error(`Error al agregar la venta`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await ventas.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar la venta`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await ventas.remove(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar la venta`, err.message);
    next(err);
  }
});

module.exports = router;