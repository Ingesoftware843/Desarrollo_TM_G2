const db = require("../db/config");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// GET: Obtener todos los usuarios (protegido con JWT)
const getUsuarios = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Usuarios");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM Usuarios WHERE UsuarioID = @id",
      { id }
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// POST: Crear usuario desde ruta pública (sin token)
const crearUsuarioPublic = async (req, res) => {
  const { NombreA, Usuario, Contrasena, RolID, EstadoID } = req.body;

  try {
    const existente = await db.query(
      "SELECT * FROM Usuarios WHERE Usuario = @Usuario",
      { Usuario }
    );

    if (existente.recordset.length > 0) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);

    await db.query(
      `INSERT INTO Usuarios (NombreA, Usuario, Contrasena, RolID, EstadoID)
       VALUES (@NombreA, @Usuario, @Contrasena, @RolID, @EstadoID)`,
      {
        NombreA,
        Usuario,
        Contrasena: hashedPassword,
        RolID,
        EstadoID,
      }
    );

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("⛔ ERROR DETECTADO:", error);
    res.status(500).json({ error: "Error al registrar usuario público" });
  }
};

// POST: Crear usuario desde backend (requiere token)
const crearUsuario = async (req, res) => {
  const { NombreA, Usuario, Contrasena, RolID, EstadoID } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);

    await db.query(
      `INSERT INTO Usuarios (NombreA, Usuario, Contrasena, RolID, EstadoID)
       VALUES (@NombreA, @Usuario, @Contrasena, @RolID, @EstadoID)`,
      {
        NombreA,
        Usuario,
        Contrasena: hashedPassword,
        RolID,
        EstadoID,
      }
    );

    res.status(201).json({ message: "Usuario creado desde sistema" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario interno" });
  }
};

// PUT: actualizar usuario (admin)
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { NombreA, Usuario, RolID, EstadoID } = req.body;

  try {
    await db.query(
      `UPDATE Usuarios SET
        NombreA = @NombreA,
        Usuario = @Usuario,
        RolID = @RolID,
        EstadoID = @EstadoID
      WHERE UsuarioID = @id`,
      { NombreA, Usuario, RolID, EstadoID, id }
    );

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// PUT: actualizar solo contraseña (admin o usuario dueño)
const actualizarContrasena = async (req, res) => {
  const { id } = req.params;
  const { Contrasena } = req.body;
  const usuarioSolicitante = req.usuario;

  try {
    if (!Contrasena || Contrasena.trim() === "") {
      return res
        .status(400)
        .json({ error: "La contraseña no puede estar vacía" });
    }

    const esAdmin = usuarioSolicitante.RolID === 4;
    const esSuPropioID = usuarioSolicitante.UsuarioID === parseInt(id);

    if (!esAdmin && !esSuPropioID) {
      return res
        .status(403)
        .json({ error: "Solo puedes actualizar tu propia contraseña" });
    }

    const hashedPassword = await bcrypt.hash(Contrasena, saltRounds);

    await db.query(
      "UPDATE Usuarios SET Contrasena = @Contrasena WHERE UsuarioID = @id",
      { Contrasena: hashedPassword, id }
    );

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error actualizando contraseña:", error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};

// DELETE: eliminar usuario (solo admin)
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM Usuarios WHERE UsuarioID = @id`, { id });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioPorId,
  crearUsuarioPublic,
  crearUsuario,
  actualizarUsuario,
  actualizarContrasena,
  eliminarUsuario,
};
