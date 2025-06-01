const express = require("express");
const router = express.Router();
const {
  getAsignacionesGuardias,
  crearAsignacionGuardia,
  actualizarAsignacionGuardia,
  eliminarAsignacionGuardia,
} = require("../controllers/asignacionguardiascontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getAsignacionesGuardias);
router.post(
  "/",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  crearAsignacionGuardia
);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarAsignacionGuardia
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAsignacionGuardia
);

module.exports = router;
