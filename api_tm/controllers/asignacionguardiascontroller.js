const db = require("../db/config");

// GET: Obtener todas las asignaciones de guardias con JOIN
const getAsignacionesGuardias = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT AG.AsignacionID, G.Nombre AS Guardia, A.Descripcion AS Acceso, 
              E.Nombre AS Estacion, AG.FechaInicio, AG.FechaFin, AG.Turno, ES.NombreEstado AS Estado
       FROM AsignacionGuardias AG
       JOIN Guardias G ON AG.GuardiaID = G.GuardiaID
       JOIN Accesos A ON AG.AccesoID = A.AccesoID
       JOIN Estaciones E ON A.EstacionID = E.EstacionID
       JOIN Estados ES ON AG.EstadoID = ES.EstadoID`
    );
    res.json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener asignaciones de guardias" });
  }
};

// POST: crear una nueva asignación
const crearAsignacionGuardia = async (req, res) => {
  const { AccesoID, GuardiaID, FechaInicio, FechaFin, Turno, EstadoID } =
    req.body;

  try {
    await db.query(
      `INSERT INTO AsignacionGuardias (AccesoID, GuardiaID, FechaInicio, FechaFin, Turno, EstadoID)
       VALUES (@AccesoID, @GuardiaID, @FechaInicio, @FechaFin, @Turno, @EstadoID)`,
      { AccesoID, GuardiaID, FechaInicio, FechaFin, Turno, EstadoID }
    );

    res.status(201).json({ message: "Guardia asignado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al asignar guardia" });
  }
};

// PUT: actualizar asignación
const actualizarAsignacionGuardia = async (req, res) => {
  const { id } = req.params;
  const { AccesoID, GuardiaID, FechaInicio, FechaFin, Turno, EstadoID } =
    req.body;

  try {
    await db.query(
      `UPDATE AsignacionGuardias SET
        AccesoID = @AccesoID,
        GuardiaID = @GuardiaID,
        FechaInicio = @FechaInicio,
        FechaFin = @FechaFin,
        Turno = @Turno,
        EstadoID = @EstadoID
      WHERE AsignacionID = @id`,
      { AccesoID, GuardiaID, FechaInicio, FechaFin, Turno, EstadoID, id }
    );

    res.json({ message: "Asignación actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar asignación" });
  }
};

// DELETE: eliminar asignación
const eliminarAsignacionGuardia = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM AsignacionGuardias WHERE AsignacionID = @id", {
      id,
    });
    res.json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar asignación" });
  }
};

module.exports = {
  getAsignacionesGuardias,
  crearAsignacionGuardia,
  actualizarAsignacionGuardia,
  eliminarAsignacionGuardia,
};
