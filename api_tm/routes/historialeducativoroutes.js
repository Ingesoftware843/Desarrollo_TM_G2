const express = require("express");
const router = express.Router();
const {
  getHistorialPorPiloto,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial,
} = require("../controllers/historialeducativocontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", getHistorialPorPiloto);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearHistorial);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarHistorial
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarHistorial
);

module.exports = router;
