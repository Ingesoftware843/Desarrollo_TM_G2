const db = require("../db/config");

// GET: Obtener todas las relaciones línea-estación
const getLineasEstaciones = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT LE.*, L.Nombre AS NombreLinea, E.Nombre AS NombreEstacion
       FROM LineasEstaciones LE
       JOIN Lineas L ON LE.LineaID = L.LineaID
       JOIN Estaciones E ON LE.EstacionID = E.EstacionID
       ORDER BY LE.LineaID, LE.OrdenEstacion`
    );
    res.json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener asignaciones de estaciones a líneas" });
  }
};

// POST: asignar estación a línea
const asignarEstacion = async (req, res) => {
  const { LineaID, EstacionID, OrdenEstacion, DistanciaAnterior } = req.body;

  try {
    await db.query(
      `INSERT INTO LineasEstaciones (LineaID, EstacionID, OrdenEstacion, DistanciaAnterior)
       VALUES (@LineaID, @EstacionID, @OrdenEstacion, @DistanciaAnterior)`,
      { LineaID, EstacionID, OrdenEstacion, DistanciaAnterior }
    );
    res
      .status(201)
      .json({ message: "Estación asignada a línea correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al asignar estación a línea" });
  }
};

// PUT: actualizar asignación
const actualizarAsignacion = async (req, res) => {
  const { LineaID, EstacionID } = req.params;
  const { OrdenEstacion, DistanciaAnterior } = req.body;

  try {
    await db.query(
      `UPDATE LineasEstaciones
       SET OrdenEstacion = @OrdenEstacion, DistanciaAnterior = @DistanciaAnterior
       WHERE LineaID = @LineaID AND EstacionID = @EstacionID`,
      { OrdenEstacion, DistanciaAnterior, LineaID, EstacionID }
    );
    res.json({ message: "Asignación actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar asignación" });
  }
};

// DELETE: eliminar asignación
const eliminarAsignacion = async (req, res) => {
  const { LineaID, EstacionID } = req.params;

  try {
    await db.query(
      `DELETE FROM LineasEstaciones WHERE LineaID = @LineaID AND EstacionID = @EstacionID`,
      { LineaID, EstacionID }
    );
    res.json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar asignación" });
  }
};

module.exports = {
  getLineasEstaciones,
  asignarEstacion,
  actualizarAsignacion,
  eliminarAsignacion,
};
