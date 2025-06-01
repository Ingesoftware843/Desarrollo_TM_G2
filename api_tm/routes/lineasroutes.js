const express = require("express");
const router = express.Router();
const {
  getLineas,
  crearLinea,
  actualizarLinea,
  eliminarLinea,
} = require("../controllers/lineascontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getLineas);
router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearLinea);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarLinea
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarLinea
);

module.exports = router;
