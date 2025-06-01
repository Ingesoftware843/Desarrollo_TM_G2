const express = require("express");
const router = express.Router();
const {
  getGuardias,
  crearGuardia,
  actualizarGuardia,
  eliminarGuardia,
} = require("../controllers/guardiascontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getGuardias);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearGuardia);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarGuardia
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarGuardia
);

module.exports = router;
