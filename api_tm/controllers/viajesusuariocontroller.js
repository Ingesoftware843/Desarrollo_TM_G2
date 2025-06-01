const db = require("../db/config");

exports.getMisViajes = async (req, res) => {
  const UsuarioID = req.usuario?.UsuarioID;

  if (!UsuarioID) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const result = await db.query(
      `SELECT V.ViajeID, V.EstacionOrigenID, E1.Nombre AS Origen,
              V.EstacionDestinoID, E2.Nombre AS Destino, V.FechaRegistro
       FROM ViajesUsuario V
       JOIN Estaciones E1 ON V.EstacionOrigenID = E1.EstacionID
       JOIN Estaciones E2 ON V.EstacionDestinoID = E2.EstacionID
       WHERE V.UsuarioID = @UsuarioID`,
      { UsuarioID }
    );

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener viajes del usuario:", error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
};

exports.crearMiViaje = async (req, res) => {
  const UsuarioID = req.usuario?.UsuarioID;
  const { EstacionOrigenID, EstacionDestinoID } = req.body;

  if (!UsuarioID || !EstacionOrigenID || !EstacionDestinoID) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    await db.query(
      `INSERT INTO ViajesUsuario (UsuarioID, EstacionOrigenID, EstacionDestinoID)
       VALUES (@UsuarioID, @EstacionOrigenID, @EstacionDestinoID)`,
      {
        UsuarioID,
        EstacionOrigenID,
        EstacionDestinoID,
      }
    );

    res.status(201).json({ message: "Viaje registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar viaje:", error);
    res.status(500).json({ error: "Error al registrar el viaje" });
  }
};
