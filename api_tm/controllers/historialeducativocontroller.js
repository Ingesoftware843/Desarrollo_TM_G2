const db = require("../db/config");

// GET: Obtener historial educativo por piloto
const getHistorialPorPiloto = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM HistorialEducativo`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener historial educativo" });
  }
};

// POST: Crear historial educativo
const crearHistorial = async (req, res) => {
  const {
    PilotoID,
    NivelEducativo,
    Institucion,
    FechaInicio,
    FechaFin,
    Certificacion,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO HistorialEducativo 
        (PilotoID, NivelEducativo, Institucion, FechaInicio, FechaFin, Certificacion)
       VALUES 
        (@PilotoID, @NivelEducativo, @Institucion, @FechaInicio, @FechaFin, @Certificacion)`,
      {
        PilotoID,
        NivelEducativo,
        Institucion,
        FechaInicio,
        FechaFin,
        Certificacion,
      }
    );

    res
      .status(201)
      .json({ message: "Historial educativo agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear historial educativo" });
  }
};

// PUT: Actualizar historial
const actualizarHistorial = async (req, res) => {
  const { id } = req.params;
  const { NivelEducativo, Institucion, FechaInicio, FechaFin, Certificacion } =
    req.body;

  try {
    await db.query(
      `UPDATE HistorialEducativo SET
        NivelEducativo = @NivelEducativo,
        Institucion = @Institucion,
        FechaInicio = @FechaInicio,
        FechaFin = @FechaFin,
        Certificacion = @Certificacion
      WHERE HistorialID = @id`,
      {
        NivelEducativo,
        Institucion,
        FechaInicio,
        FechaFin,
        Certificacion,
        id,
      }
    );

    res.json({ message: "Historial actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar historial educativo" });
  }
};

// DELETE: Eliminar historial
const eliminarHistorial = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM HistorialEducativo WHERE HistorialID = @id", {
      id,
    });
    res.json({ message: "Historial educativo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar historial educativo" });
  }
};

module.exports = {
  getHistorialPorPiloto,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial,
};
