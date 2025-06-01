const express = require("express");
const router = express.Router();
const {
  getAsignacionesOperadores,
  crearAsignacionOperador,
  actualizarAsignacionOperador,
  eliminarAsignacionOperador,
} = require("../controllers/asignacionoperadorescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getAsignacionesOperadores);
router.post(
  "/",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  crearAsignacionOperador
);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarAsignacionOperador
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAsignacionOperador
);

module.exports = router;
