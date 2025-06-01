const express = require("express");
const router = express.Router();
const {
  getMunicipios,
  crearMunicipio,
  actualizarMunicipio,
  eliminarMunicipio,
} = require("../controllers/municipioscontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getMunicipios);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearMunicipio);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarMunicipio
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarMunicipio
);

module.exports = router;
