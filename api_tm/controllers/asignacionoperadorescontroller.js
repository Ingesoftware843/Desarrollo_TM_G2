const db = require("../db/config");

// GET: Obtener todas las asignaciones de operadores
const getAsignacionesOperadores = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT AO.AsignacionID, O.Nombre AS Operador, E.Nombre AS Estacion, 
              AO.FechaInicio, AO.FechaFin, AO.Turno, ES.NombreEstado AS Estado
       FROM AsignacionOperadores AO
       JOIN Operadores O ON AO.OperadorID = O.OperadorID
       JOIN Estaciones E ON AO.EstacionID = E.EstacionID
       JOIN Estados ES ON AO.EstadoID = ES.EstadoID`
    );
    res.json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener asignaciones de operadores" });
  }
};

// POST: crear una asignación
const crearAsignacionOperador = async (req, res) => {
  const { EstacionID, OperadorID, FechaInicio, FechaFin, Turno, EstadoID } =
    req.body;

  try {
    await db.query(
      `INSERT INTO AsignacionOperadores 
        (EstacionID, OperadorID, FechaInicio, FechaFin, Turno, EstadoID)
       VALUES 
        (@EstacionID, @OperadorID, @FechaInicio, @FechaFin, @Turno, @EstadoID)`,
      { EstacionID, OperadorID, FechaInicio, FechaFin, Turno, EstadoID }
    );

    res.status(201).json({ message: "Asignación de operador registrada" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear asignación de operador" });
  }
};

// PUT: actualizar asignación
const actualizarAsignacionOperador = async (req, res) => {
  const { id } = req.params;
  const { EstacionID, OperadorID, FechaInicio, FechaFin, Turno, EstadoID } =
    req.body;

  try {
    await db.query(
      `UPDATE AsignacionOperadores SET
        EstacionID = @EstacionID,
        OperadorID = @OperadorID,
        FechaInicio = @FechaInicio,
        FechaFin = @FechaFin,
        Turno = @Turno,
        EstadoID = @EstadoID
      WHERE AsignacionID = @id`,
      { EstacionID, OperadorID, FechaInicio, FechaFin, Turno, EstadoID, id }
    );

    res.json({ message: "Asignación de operador actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar asignación" });
  }
};

// DELETE: eliminar asignación
const eliminarAsignacionOperador = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "DELETE FROM AsignacionOperadores WHERE AsignacionID = @id",
      { id }
    );
    res.json({ message: "Asignación de operador eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar asignación" });
  }
};

module.exports = {
  getAsignacionesOperadores,
  crearAsignacionOperador,
  actualizarAsignacionOperador,
  eliminarAsignacionOperador,
};
