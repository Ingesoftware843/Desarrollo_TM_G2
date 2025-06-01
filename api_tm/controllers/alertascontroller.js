const db = require("../db/config");

// GET: obtener todas las alertas (activas por defecto)
const getAlertas = async (req, res) => {
  const { estado } = req.query;

  try {
    const query = estado
      ? `SELECT * FROM Alertas WHERE Estado = @estado ORDER BY FechaHora DESC`
      : `SELECT * FROM Alertas ORDER BY FechaHora DESC`;

    const result = await db.query(query, estado ? { estado } : {});
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener alertas" });
  }
};

// POST: registrar nueva alerta
const crearAlerta = async (req, res) => {
  let { TipoAlerta, EstacionID, BusID, FechaHora, Descripcion, Estado } =
    req.body;

  // Validaciones básicas
  if (!TipoAlerta || !Descripcion) {
    return res
      .status(400)
      .json({ error: "Faltan campos obligatorios: TipoAlerta o Descripcion." });
  }

  // Asegurar que los IDs sean válidos para las claves foráneas
  EstacionID = EstacionID && EstacionID > 0 ? EstacionID : null;
  BusID = BusID && BusID > 0 ? BusID : null;
  FechaHora = FechaHora || new Date(); // fallback por si no lo envían
  Estado = Estado || "Activa";

  try {
    await db.query(
      `INSERT INTO Alertas 
        (TipoAlerta, EstacionID, BusID, FechaHora, Descripcion, Estado)
       VALUES 
        (@TipoAlerta, @EstacionID, @BusID, @FechaHora, @Descripcion, @Estado)`,
      { TipoAlerta, EstacionID, BusID, FechaHora, Descripcion, Estado }
    );

    res.status(201).json({ message: "Alerta registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar alerta:", error);
    res.status(500).json({ error: "Error interno al registrar la alerta" });
  }
};

// PUT: actualizar estado de la alerta
const actualizarEstadoAlerta = async (req, res) => {
  const { id } = req.params;
  const { Estado } = req.body;

  if (!Estado) {
    return res.status(400).json({ error: "El campo 'Estado' es requerido." });
  }

  try {
    const result = await db.query(
      `UPDATE Alertas SET Estado = @Estado WHERE AlertaID = @id`,
      { Estado, id }
    );

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró una alerta con ese ID." });
    }

    res.json({ message: "Estado de alerta actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar alerta" });
  }
};

// DELETE: eliminar alerta (opcional)
const eliminarAlerta = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Alertas WHERE AlertaID = @id", { id });
    res.json({ message: "Alerta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar alerta" });
  }
};

module.exports = {
  getAlertas,
  crearAlerta,
  actualizarEstadoAlerta,
  eliminarAlerta,
};
