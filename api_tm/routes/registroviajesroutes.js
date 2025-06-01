const express = require("express");
const router = express.Router();
const {
  getViajes,
  crearViaje,
  actualizarViaje,
  eliminarViaje,
} = require("../controllers/registroviajescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getViajes);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearViaje);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarViaje
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarViaje
);

module.exports = router;
