const db = require("../db/config");

// GET: obtener todos los accesos
const getAccesos = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT A.*, E.Nombre AS NombreEstacion
       FROM Accesos A
       JOIN Estaciones E ON A.EstacionID = E.EstacionID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener accesos" });
  }
};

// POST: crear acceso
const crearAcceso = async (req, res) => {
  const { EstacionID, Descripcion, Estado } = req.body;

  try {
    await db.query(
      `INSERT INTO Accesos (EstacionID, Descripcion, Estado)
       VALUES (@EstacionID, @Descripcion, @Estado)`,
      { EstacionID, Descripcion, Estado }
    );
    res.status(201).json({ message: "Acceso creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear acceso" });
  }
};

// PUT: actualizar acceso
const actualizarAcceso = async (req, res) => {
  const { id } = req.params;
  const { EstacionID, Descripcion, Estado } = req.body;

  try {
    await db.query(
      `UPDATE Accesos SET
        EstacionID = @EstacionID,
        Descripcion = @Descripcion,
        Estado = @Estado
      WHERE AccesoID = @id`,
      { EstacionID, Descripcion, Estado, id }
    );
    res.json({ message: "Acceso actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar acceso" });
  }
};

// DELETE: eliminar acceso
const eliminarAcceso = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Accesos WHERE AccesoID = @id", { id });
    res.json({ message: "Acceso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar acceso" });
  }
};

module.exports = {
  getAccesos,
  crearAcceso,
  actualizarAcceso,
  eliminarAcceso,
};
