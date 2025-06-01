const db = require("../db/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.loginUsuario = async (req, res) => {
  const { Usuario, Contrasena } = req.body;

  try {
    const result = await db.query(
      `SELECT * FROM Usuarios WHERE Usuario = @Usuario`,
      { Usuario }
    );

    const usuario = result.recordset[0];

    if (!usuario) {
      await registrarIntento(null, false);
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(Contrasena, usuario.Contrasena);
    if (!esValida) {
      await registrarIntento(usuario.UsuarioID, false);
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    if (usuario.EstadoID !== 1) {
      await registrarIntento(usuario.UsuarioID, false);
      return res.status(403).json({ error: "Usuario inactivo" });
    }

    const token = jwt.sign(
      {
        UsuarioID: usuario.UsuarioID,
        RolID: usuario.RolID,
      },
      process.env.JWT_SECRET,
      //{ expiresIn: "1h" }
      { expiresIn: "10d" }
    );

    await registrarIntento(usuario.UsuarioID, true);
    res.cookie("TokenAuth", token, {
      httpOnly: false, // proteccion de cookie
      secure: false, // ✅ pon false si estás en localhost sin HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    res.json({
      token,
      usuario: {
        nombre: usuario.NombreA,
        rol: usuario.RolID,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

async function registrarIntento(UsuarioID, Exitoso) {
  if (!UsuarioID) return;
  try {
    await db.query(
      `INSERT INTO IntentosLogin (UsuarioID, Exitoso) VALUES (@UsuarioID, @Exitoso)`,
      { UsuarioID, Exitoso }
    );
  } catch (e) {
    console.error("Error registrando intento:", e);
  }
}
