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

/* GET  INGRESOS*/
router.get('/ingresos', async function(req, res, next) {
  try {
    res.json(await ventas.getIngresos(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los ingresos`, err.message);
    next(err);
  }
});

/* GET  PAGOS */
router.get('/pagos', async function(req, res, next) {
  try {
    res.json(await ventas.getPagos(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los pagos`, err.message);
    next(err);
  }
});

/* GET MAS VENDIDOS */
router.get('/MasVendidos', async function(req, res, next) {
  try {
    res.json(await ventas.getMasVendidos(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los productos más vendidos`, err.message);
    next(err);
  }
});

/*POST*/
router.post('/nuevaVenta/:id/:cedula/:facturaId', async function(req, res, next) {
  try {
    res.json(await ventas.create(req.params.id,req.params.cedula,req.params.facturaId));
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