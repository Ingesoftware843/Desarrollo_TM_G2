const db = require("../db/config");
const generarAlerta = require("../utils/generaralerta");

// GET: Obtener todas las asignaciones de pilotos con JOIN
const getAsignacionesPilotos = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT AP.AsignacionID, P.Nombre AS Piloto, B.Placa AS Bus, 
              AP.FechaInicio, AP.FechaFin, AP.Turno
       FROM AsignacionPilotos AP
       JOIN Pilotos P ON AP.PilotoID = P.PilotoID
       JOIN Buses B ON AP.BusID = B.BusID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener asignaciones de pilotos" });
  }
};

// POST: crear asignación
const crearAsignacionPiloto = async (req, res) => {
  const { BusID, PilotoID, FechaInicio, FechaFin, Turno } = req.body;

  try {
    await db.query(
      `INSERT INTO AsignacionPilotos 
        (BusID, PilotoID, FechaInicio, FechaFin, Turno)
       VALUES 
        (@BusID, @PilotoID, @FechaInicio, @FechaFin, @Turno)`,
      { BusID, PilotoID, FechaInicio, FechaFin, Turno }
    );

    // Verificar si el piloto tiene historial educativo
    const result = await db.query(
      "SELECT 1 FROM HistorialEducativo WHERE PilotoID = @PilotoID",
      { PilotoID }
    );

    if (result.recordset.length === 0) {
      await generarAlerta({
        TipoAlerta: "Piloto sin Historial Educativo",
        Descripcion: `El piloto ID ${PilotoID} fue asignado sin historial educativo registrado.`,
      });
    }

    res
      .status(201)
      .json({ message: "Asignación de piloto registrada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear asignación de piloto" });
  }
};

// PUT: actualizar asignación
const actualizarAsignacionPiloto = async (req, res) => {
  const { id } = req.params;
  const { BusID, PilotoID, FechaInicio, FechaFin, Turno } = req.body;

  try {
    await db.query(
      `UPDATE AsignacionPilotos SET
        BusID = @BusID,
        PilotoID = @PilotoID,
        FechaInicio = @FechaInicio,
        FechaFin = @FechaFin,
        Turno = @Turno
      WHERE AsignacionID = @id`,
      { BusID, PilotoID, FechaInicio, FechaFin, Turno, id }
    );

    res.json({ message: "Asignación de piloto actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar asignación de piloto" });
  }
};

// DELETE: eliminar asignación
const eliminarAsignacionPiloto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM AsignacionPilotos WHERE AsignacionID = @id", {
      id,
    });
    res.json({ message: "Asignación de piloto eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar asignación de piloto" });
  }
};

module.exports = {
  getAsignacionesPilotos,
  crearAsignacionPiloto,
  actualizarAsignacionPiloto,
  eliminarAsignacionPiloto,
};
