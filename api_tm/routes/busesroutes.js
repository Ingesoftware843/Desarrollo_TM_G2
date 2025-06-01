const express = require("express");
const router = express.Router();
const {
  getBuses,
  crearBus,
  actualizarBus,
  eliminarBus,
} = require("../controllers/busescontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getBuses);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearBus);
router.put("/:id", verificarToken, verificarAdmin(roles.ADMIN), actualizarBus);
router.delete("/:id", verificarToken, verificarAdmin(roles.ADMIN), eliminarBus);

module.exports = router;
