const express = require("express");
const router = express.Router();
const {
  getEstaciones,
  getEstacionesDetalle,
  crearEstacion,
  actualizarEstacion,
  eliminarEstacion,
} = require("../controllers/estacionescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getEstaciones);
router.get("/detalle", verificarToken, getEstacionesDetalle);

router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearEstacion);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarEstacion
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarEstacion
);

module.exports = router;
