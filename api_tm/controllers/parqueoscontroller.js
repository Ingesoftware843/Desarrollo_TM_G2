const db = require("../db/config");

// GET: obtener todos los parqueos
const getParqueos = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT P.ParqueoID, P.Capacidad, P.Estado, E.Nombre AS NombreEstacion, P.EstacionID
        FROM Parqueos P
        JOIN Estaciones E ON P.EstacionID = E.EstacionID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener parqueos" });
  }
};

// POST: crear parqueo
const crearParqueo = async (req, res) => {
  const { EstacionID, Capacidad, Estado } = req.body;

  try {
    await db.query(
      `INSERT INTO Parqueos (EstacionID, Capacidad, Estado)
       VALUES (@EstacionID, @Capacidad, @Estado)`,
      { EstacionID, Capacidad, Estado }
    );
    res.status(201).json({ message: "Parqueo registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar parqueo" });
  }
};

// PUT: actualizar parqueo
const actualizarParqueo = async (req, res) => {
  const { id } = req.params;
  const { EstacionID, Capacidad, Estado } = req.body;

  try {
    await db.query(
      `UPDATE Parqueos SET
        EstacionID = @EstacionID,
        Capacidad = @Capacidad,
        Estado = @Estado
      WHERE ParqueoID = @id`,
      { EstacionID, Capacidad, Estado, id }
    );

    res.json({ message: "Parqueo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar parqueo" });
  }
};

// DELETE: eliminar parqueo
const eliminarParqueo = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Parqueos WHERE ParqueoID = @id", { id });
    res.json({ message: "Parqueo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar parqueo" });
  }
};

module.exports = {
  getParqueos,
  crearParqueo,
  actualizarParqueo,
  eliminarParqueo,
};
