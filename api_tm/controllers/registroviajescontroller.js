const db = require("../db/config");
const {
  verificarSobrecupo,
  verificarBajaOcupacion,
} = require("../utils/alertasautomatizadas");

// GET: Obtener todos los viajes
const getViajes = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        V.ViajeID, 
        V.BusID, 
        V.EstacionOrigenID, 
        V.EstacionDestinoID,
        B.Placa AS Bus, 
        EO.Nombre AS EstacionOrigen, 
        ED.Nombre AS EstacionDestino, 
        V.FechaHoraSalida, 
        V.FechaHoraLlegada, 
        V.CantidadPasajeros, 
        V.Estado
      FROM RegistroViajes V
      JOIN Buses B ON V.BusID = B.BusID
      JOIN Estaciones EO ON V.EstacionOrigenID = EO.EstacionID
      JOIN Estaciones ED ON V.EstacionDestinoID = ED.EstacionID
      ORDER BY V.FechaHoraSalida DESC
    `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener viajes:", error);
    res.status(500).json({ error: "Error al obtener viajes" });
  }
};

// POST: Crear nuevo viaje
const crearViaje = async (req, res) => {
  const {
    BusID,
    EstacionOrigenID,
    EstacionDestinoID,
    FechaHoraSalida,
    FechaHoraLlegada,
    CantidadPasajeros,
    Estado,
  } = req.body;

  try {
    await db.query(
      `
      INSERT INTO RegistroViajes 
        (BusID, EstacionOrigenID, EstacionDestinoID, FechaHoraSalida, FechaHoraLlegada, CantidadPasajeros, Estado)
      VALUES 
        (@BusID, @EstacionOrigenID, @EstacionDestinoID, @FechaHoraSalida, @FechaHoraLlegada, @CantidadPasajeros, @Estado)
    `,
      {
        BusID,
        EstacionOrigenID,
        EstacionDestinoID,
        FechaHoraSalida,
        FechaHoraLlegada: FechaHoraLlegada || null,
        CantidadPasajeros,
        Estado,
      }
    );

    // Alertas automáticas
    const bus = await db.query(
      "SELECT CapacidadMaxima FROM Buses WHERE BusID = @BusID",
      { BusID }
    );
    const capacidadMaxima = bus.recordset[0]?.CapacidadMaxima || 0;

    const estacion = await db.query(
      "SELECT CapacidadEstimada FROM Estaciones WHERE EstacionID = @id",
      {
        id: EstacionDestinoID,
      }
    );
    const capacidadEstimada = estacion.recordset[0]?.CapacidadEstimada || 100;

    await verificarBajaOcupacion(BusID, capacidadMaxima, CantidadPasajeros);
    await verificarSobrecupo(
      EstacionDestinoID,
      capacidadEstimada,
      CantidadPasajeros
    );

    res.status(201).json({ message: "Registro de viaje creado correctamente" });
  } catch (error) {
    console.error("Error al registrar viaje:", error);
    res
      .status(500)
      .json({ error: "Error al registrar viaje", detalle: error.message });
  }
};

// PUT: Actualizar viaje
const actualizarViaje = async (req, res) => {
  const { id } = req.params;
  const {
    BusID,
    EstacionOrigenID,
    EstacionDestinoID,
    FechaHoraSalida,
    FechaHoraLlegada,
    CantidadPasajeros,
    Estado,
  } = req.body;

  try {
    await db.query(
      `
      UPDATE RegistroViajes SET
        BusID = @BusID,
        EstacionOrigenID = @EstacionOrigenID,
        EstacionDestinoID = @EstacionDestinoID,
        FechaHoraSalida = @FechaHoraSalida,
        FechaHoraLlegada = @FechaHoraLlegada,
        CantidadPasajeros = @CantidadPasajeros,
        Estado = @Estado
      WHERE ViajeID = @id
    `,
      {
        id,
        BusID,
        EstacionOrigenID,
        EstacionDestinoID,
        FechaHoraSalida,
        FechaHoraLlegada: FechaHoraLlegada || null,
        CantidadPasajeros,
        Estado,
      }
    );

    res.json({ message: "Registro de viaje actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar viaje:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar viaje", detalle: error.message });
  }
};

// DELETE: Eliminar viaje
const eliminarViaje = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM RegistroViajes WHERE ViajeID = @id", { id });
    res.json({ message: "Registro de viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    res.status(500).json({ error: "Error al eliminar viaje" });
  }
};

module.exports = {
  getViajes,
  crearViaje,
  actualizarViaje,
  eliminarViaje,
};
