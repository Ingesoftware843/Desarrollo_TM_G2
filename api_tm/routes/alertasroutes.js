const express = require("express");
const router = express.Router();
const {
  getAlertas,
  crearAlerta,
  actualizarEstadoAlerta,
  eliminarAlerta,
} = require("../controllers/alertascontroller");
const {
  verificarTodo,
} = require("../controllers/verificacionglobalcontroller");

const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin");
const roles = require("../utils/roles");

router.get("/", verificarToken, getAlertas); // filtro opcional: ?estado=Activa
router.get(
  "/verificar-todo",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  verificarTodo
);

router.post("/", verificarToken, verificarAdmin(roles.ADMIN), crearAlerta);
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarEstadoAlerta
);
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarAlerta
);

module.exports = router;
