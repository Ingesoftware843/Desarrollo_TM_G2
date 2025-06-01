const express = require("express");
const router = express.Router();
const {
  getRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
} = require("../controllers/rolescontroller");

const roles = require("../utils/roles");
const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");

router.get("/", verificarToken, getRoles);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearRol);
router.put("/:id", verificarToken, verificarAdmin(roles.ADMIN), actualizarRol);
router.delete("/:id", verificarToken, verificarAdmin(roles.ADMIN), eliminarRol);

module.exports = router;
