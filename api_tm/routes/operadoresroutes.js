const express = require("express");
const router = express.Router();
const {
  getOperadores,
  crearOperador,
  actualizarOperador,
  eliminarOperador,
} = require("../controllers/operadorescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getOperadores);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearOperador);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarOperador
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarOperador
);

module.exports = router;
