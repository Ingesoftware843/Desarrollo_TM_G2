const express = require("express");
const router = express.Router();
const {
  getLineasEstaciones,
  asignarEstacion,
  actualizarAsignacion,
  eliminarAsignacion,
} = require("../controllers/lineasestacionescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getLineasEstaciones);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), asignarEstacion);
router.put(
  "/:LineaID/:EstacionID",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarAsignacion
);
router.delete(
  "/:LineaID/:EstacionID",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAsignacion
);

module.exports = router;
