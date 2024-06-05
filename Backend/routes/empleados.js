const express = require('express');
const router = express.Router();
const empleados = require('../services/empleados');

/* GET  */
router.get('/', async function(req, res, next) {
  try {
    res.json(await empleados.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error al obtener los empleados`, err.message);
    next(err);
  }
});

/*POST*/
router.post('/', async function(req, res, next) {
  try {
    res.json(await empleados.create(req.body));
  } catch (err) {
    console.error(`Error al agregar el empleado`, err.message);
    next(err);
  }
});

/* PUT */
router.put('/:cedula', async function(req, res, next) {
  try {
    res.json(await empleados.update(req.params.cedula, req.body));
  } catch (err) {
    console.error(`Error al actualizar al empleado`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:cedula', async function(req, res, next) {
  try {
    res.json(await empleados.remove(req.params.cedula));
  } catch (err) {
    console.error(`Error al eliminar al empleado`, err.message);
    next(err);
  }
});

module.exports = router;