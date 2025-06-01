const express = require("express");
const router = express.Router();
const {
  getParqueos,
  crearParqueo,
  actualizarParqueo,
  eliminarParqueo,
} = require("../controllers/parqueoscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getParqueos);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearParqueo);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarParqueo
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarParqueo
);

module.exports = router;
