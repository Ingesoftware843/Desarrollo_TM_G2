const express = require("express");
const router = express.Router();
const {
  getMisViajes,
  crearMiViaje,
} = require("../controllers/viajesusuariocontroller");

const verificarToken = require("../middleware/auth");

// Solo usuarios autenticados pueden consultar y registrar sus propios viajes
router.get("/", verificarToken, getMisViajes);
router.post("/", verificarToken, crearMiViaje);

module.exports = router;
