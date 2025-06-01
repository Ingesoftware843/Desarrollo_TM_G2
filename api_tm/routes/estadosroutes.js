const express = require("express");
const router = express.Router();
const {
  getEstados,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
} = require("../controllers/estadoscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin"); // dinámico
const roles = require("../utils/roles"); // tu archivo de constantes de rol

router.get("/", verificarToken, getEstados);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearEstado);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarEstado
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarEstado
);

module.exports = router;
