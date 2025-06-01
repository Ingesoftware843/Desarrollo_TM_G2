const express = require("express");
const router = express.Router();
const loginController = require("../controllers/logincontroller");

// Ruta para iniciar sesión
router.post("/", loginController.loginUsuario);

// Ruta para cerrar sesión
router.post("/logout", (req, res) => {
  res.clearCookie("TokenAuth", {
    httpOnly: false, // proteccion de cookie
    secure: false, // si estás en producción con HTTPS
    sameSite: "lax",
  });
  res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
});

module.exports = router;
