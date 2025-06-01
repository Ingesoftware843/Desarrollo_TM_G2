const db = require("../db/config");

// GET: listar estados
const getEstados = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Estados");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estados" });
  }
};

// POST: crear estado
const crearEstado = async (req, res) => {
  const { NombreEstado } = req.body;

  try {
    await db.query(
      "INSERT INTO Estados (NombreEstado) VALUES (@NombreEstado)",
      { NombreEstado }
    );
    res.status(201).json({ message: "Estado creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear estado" });
  }
};

// PUT: actualizar estado
const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { NombreEstado } = req.body;

  try {
    await db.query(
      "UPDATE Estados SET NombreEstado = @NombreEstado WHERE EstadoID = @id",
      { NombreEstado, id }
    );
    res.json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

// DELETE: eliminar estado
const eliminarEstado = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Estados WHERE EstadoID = @id", { id });
    res.json({ message: "Estado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar estado" });
  }
};

module.exports = {
  getEstados,
  crearEstado,
  actualizarEstado,
  eliminarEstado,
};
