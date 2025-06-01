const db = require("../db/config");

// GET: Listar roles
const getRoles = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Roles");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener roles" });
  }
};

// POST: Crear rol
const crearRol = async (req, res) => {
  const { NombreRol } = req.body;
  try {
    await db.query("INSERT INTO Roles (NombreRol) VALUES (@NombreRol)", {
      NombreRol,
    });
    res.status(201).json({ message: "Rol creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear rol" });
  }
};

// PUT: Actualizar rol
const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { NombreRol } = req.body;
  try {
    await db.query(
      "UPDATE Roles SET NombreRol = @NombreRol WHERE RolID = @id",
      { NombreRol, id }
    );
    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar rol" });
  }
};

// DELETE: Eliminar rol
const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Roles WHERE RolID = @id", { id });
    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar rol" });
  }
};

module.exports = {
  getRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
};
