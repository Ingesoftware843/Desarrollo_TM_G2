const db = require("../db/config");

// GET: obtener todas las estaciones
const getEstaciones = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT E.*, M.Nombre AS Municipalidad
       FROM Estaciones E
       JOIN Municipalidades M ON E.MunicipalidadID = M.MunicipalidadID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estaciones" });
  }
};
const getEstacionesDetalle = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        E.EstacionID,
        E.Nombre,
        E.Ubicacion,
        E.CapacidadEstimada,
        E.MunicipalidadID,
        M.Nombre AS Municipalidad,
        CASE WHEN P.ParqueoID IS NOT NULL THEN 1 ELSE 0 END AS TieneParqueo,
        (SELECT COUNT(*) FROM Accesos A WHERE A.EstacionID = E.EstacionID) AS CantidadAccesos,
        ISNULL(
          (SELECT TOP 1 L.Nombre 
           FROM LineasEstaciones LE 
           JOIN Lineas L ON L.LineaID = LE.LineaID 
           WHERE LE.EstacionID = E.EstacionID),
          'Sin línea'
        ) AS LineaAsignada
      FROM Estaciones E
        LEFT JOIN Parqueos P ON P.EstacionID = E.EstacionID
        LEFT JOIN Municipalidades M ON M.MunicipalidadID = E.MunicipalidadID
      `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener detalle de estaciones" });
  }
};

// POST: crear estación
const crearEstacion = async (req, res) => {
  const { Nombre, MunicipalidadID, Ubicacion, CapacidadEstimada, Estado } =
    req.body;

  try {
    await db.query(
      `INSERT INTO Estaciones (Nombre, MunicipalidadID, Ubicacion, Estado)
       VALUES (@Nombre, @MunicipalidadID, @Ubicacion, @CapacidadEstimada, @Estado)`,
      { Nombre, MunicipalidadID, Ubicacion, CapacidadEstimada, Estado }
    );
    res.status(201).json({ message: "Estación creada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear estación" });
  }
};

// PUT: actualizar estación
const actualizarEstacion = async (req, res) => {
  const { id } = req.params;
  const { Nombre, MunicipalidadID, Ubicacion, Estado } = req.body;

  try {
    await db.query(
      `UPDATE Estaciones SET
        Nombre = @Nombre,
        MunicipalidadID = @MunicipalidadID,
        Ubicacion = @Ubicacion,
        CapacidadEstimada = @CapacidadEstimada,
        Estado = @Estado
       WHERE EstacionID = @id`,
      { Nombre, MunicipalidadID, Ubicacion, CapacidadEstimada, Estado, id }
    );
    res.json({ message: "Estación actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estación" });
  }
};

// DELETE: eliminar estación
const eliminarEstacion = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Estaciones WHERE EstacionID = @id", { id });
    res.json({ message: "Estación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar estación" });
  }
};

module.exports = {
  getEstaciones,
  getEstacionesDetalle,
  crearEstacion,
  actualizarEstacion,
  eliminarEstacion,
};
