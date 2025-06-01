const express = require("express");
const router = express.Router();
const {
  getAccesos,
  crearAcceso,
  actualizarAcceso,
  eliminarAcceso,
} = require("../controllers/accesoscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getAccesos);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearAcceso);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarAcceso
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAcceso
);

module.exports = router;
