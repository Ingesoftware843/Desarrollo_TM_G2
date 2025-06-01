const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  getUsuarioPorId,
  crearUsuarioPublic,
  crearUsuario,
  actualizarUsuario,
  actualizarContrasena,
  eliminarUsuario,
} = require("../controllers/usuarioscontroller");

const roles = require("../utils/roles");
const verificarToken = require("../middleware/auth");
const verificarAdmin = require("../middleware/verificaradmin"); // usa verificarAdmin(4)

// 🧩 Rutas protegidas (requieren token JWT)
router.get("/", verificarToken, verificarAdmin(roles.ADMIN), getUsuarios); // Listar todos
router.get(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  getUsuarioPorId
); // Obtener uno por ID
router.post("/", verificarToken, crearUsuario); // Crear (desde admin o sistema)
router.put(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  actualizarUsuario
); // Solo admin
router.put("/actualizar-contrasena/:id", verificarToken, actualizarContrasena); // Admin o el mismo usuario
router.delete(
  "/:id",
  verificarToken,
  verificarAdmin(roles.ADMIN),
  eliminarUsuario
); // Solo admin

// 🆓 Ruta pública para registro libre de usuario
router.post("/public", crearUsuarioPublic); // No requiere token

module.exports = router;
