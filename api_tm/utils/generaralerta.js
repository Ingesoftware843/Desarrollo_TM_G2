const db = require("../db/config");

async function generarAlerta({
  TipoAlerta,
  EstacionID = null,
  BusID = null,
  Descripcion,
}) {
  const FechaHora = new Date();
  const Estado = "Activa";

  // Validar correctamente los IDs (evita claves inválidas como 0)
  const EstacionIDValido = EstacionID && EstacionID > 0 ? EstacionID : null;
  const BusIDValido = BusID && BusID > 0 ? BusID : null;

  try {
    // Verificar si ya existe una alerta activa con los mismos valores
    const result = await db.query(
      `SELECT * FROM Alertas 
       WHERE TipoAlerta = @TipoAlerta 
         AND (@EstacionID IS NULL OR EstacionID = @EstacionID)
         AND (@BusID IS NULL OR BusID = @BusID)
         AND Estado = 'Activa'`,
      {
        TipoAlerta,
        EstacionID: EstacionIDValido,
        BusID: BusIDValido,
      }
    );

    if (result.recordset.length > 0) {
      return {
        skip: true,
        message: "Alerta ya existente y activa.",
      };
    }

    // Insertar nueva alerta si no hay duplicado
    await db.query(
      `INSERT INTO Alertas 
        (TipoAlerta, EstacionID, BusID, FechaHora, Descripcion, Estado)
       VALUES 
        (@TipoAlerta, @EstacionID, @BusID, @FechaHora, @Descripcion, @Estado)`,
      {
        TipoAlerta,
        EstacionID: EstacionIDValido,
        BusID: BusIDValido,
        FechaHora,
        Descripcion,
        Estado,
      }
    );

    return {
      success: true,
      message: "Alerta generada correctamente",
    };
  } catch (error) {
    console.error("Error al generar alerta:", error);
    return {
      error: true,
      message: "Error interno al generar alerta",
    };
  }
}

module.exports = generarAlerta;
