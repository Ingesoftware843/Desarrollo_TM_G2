const express = require("express");
const router = express.Router();
const {
  getAsignacionesPilotos,
  crearAsignacionPiloto,
  actualizarAsignacionPiloto,
  eliminarAsignacionPiloto,
} = require("../controllers/asignacionpilotoscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getAsignacionesPilotos);
router.post(
  "/",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  crearAsignacionPiloto
);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarAsignacionPiloto
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAsignacionPiloto
);

module.exports = router;
