const express = require("express");
const router = express.Router();
const {
  getPilotos,
  crearPiloto,
  actualizarPiloto,
  eliminarPiloto,
} = require("../controllers/pilotoscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getPilotos);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearPiloto);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarPiloto
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarPiloto
);

module.exports = router;
