const db = require("../db/config");
const { verificarCambioParqueo } = require("../utils/alertasautomatizadas");
const generarAlerta = require("../utils/generaralerta");

// GET: obtener todos los buses
const getBuses = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT B.BusID, B.Placa, B.CapacidadMaxima, B.Estado, 
              L.Nombre AS Linea, P.ParqueoID
       FROM Buses B
       JOIN Lineas L ON B.LineaID = L.LineaID
       JOIN Parqueos P ON B.ParqueoID = P.ParqueoID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener buses" });
  }
};

// POST: crear nuevo bus
const crearBus = async (req, res) => {
  const { Placa, CapacidadMaxima, Estado, LineaID, ParqueoID } = req.body;

  try {
    await db.query(
      `INSERT INTO Buses 
        (Placa, CapacidadMaxima, Estado, LineaID, ParqueoID)
       VALUES 
        (@Placa, @CapacidadMaxima, @Estado, @LineaID, @ParqueoID)`,
      { Placa, CapacidadMaxima, Estado, LineaID, ParqueoID }
    );

    res.status(201).json({ message: "Bus registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar bus" });
  }
};

// PUT: actualizar bus
const actualizarBus = async (req, res) => {
  const { id } = req.params;
  const { Placa, CapacidadMaxima, Estado, LineaID, ParqueoID } = req.body;

  try {
    // 1. Obtener el parqueo anterior
    const result = await db.query(
      "SELECT ParqueoID FROM Buses WHERE BusID = @id",
      { id }
    );
    const parqueoAnteriorID = result.recordset[0]?.ParqueoID;

    // 2. Actualizar los datos del bus
    await db.query(
      `UPDATE Buses SET
        Placa = @Placa,
        CapacidadMaxima = @CapacidadMaxima,
        Estado = @Estado,
        LineaID = @LineaID,
        ParqueoID = @ParqueoID
      WHERE BusID = @id`,
      { Placa, CapacidadMaxima, Estado, LineaID, ParqueoID, id }
    );

    // 3. Verificar si quedó sin parqueo
    if (ParqueoID === null || ParqueoID === undefined) {
      await generarAlerta({
        TipoAlerta: "Bus sin Parqueo",
        BusID: id,
        Descripcion: `El bus ID ${id} fue actualizado sin un parqueo asignado.`,
      });
    }

    // 4. Evaluar si hubo cambio de parqueo
    await verificarCambioParqueo(id, parqueoAnteriorID, ParqueoID);

    res.json({ message: "Bus actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar bus" });
  }
};

// DELETE: eliminar bus
const eliminarBus = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Buses WHERE BusID = @id", { id });
    res.json({ message: "Bus eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar bus" });
  }
};

module.exports = {
  getBuses,
  crearBus,
  actualizarBus,
  eliminarBus,
};
