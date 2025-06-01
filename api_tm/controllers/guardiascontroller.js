const db = require("../db/config");

// GET: Obtener todos los guardias
const getGuardias = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        G.*, 
        R.NombreRol, 
        A.Descripcion AS AccesoAsignado,
        AG.FechaInicio,
        AG.FechaFin,
        CASE
          WHEN AG.FechaFin IS NULL OR AG.FechaFin >= GETDATE() THEN 'Vigente'
          ELSE 'Vencido'
        END AS EstadoAcceso
      FROM Guardias G
      LEFT JOIN Roles R ON G.RolID = R.RolID
      LEFT JOIN AsignacionGuardias AG ON AG.GuardiaID = G.GuardiaID 
        AND (AG.FechaFin IS NULL OR AG.FechaFin >= GETDATE())
      LEFT JOIN Accesos A ON AG.AccesoID = A.AccesoID
    `);
    res.json(result.recordset);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener guardias", detalle: error.message });
  }
};

// POST: Crear guardia
const crearGuardia = async (req, res) => {
  const {
    Nombre,
    DPI,
    Direccion,
    Telefono,
    Email,
    Estado,
    FechaContratacion,
    RolID,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO Guardias 
        (Nombre, DPI, Direccion, Telefono, Email, Estado, FechaContratacion, RolID)
       VALUES 
        (@Nombre, @DPI, @Direccion, @Telefono, @Email, @Estado, @FechaContratacion, @RolID)`,
      {
        Nombre,
        DPI,
        Direccion,
        Telefono,
        Email,
        Estado,
        FechaContratacion,
        RolID,
      }
    );

    res.status(201).json({ message: "Guardia creado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear guardia", detalle: error.message });
  }
};

// PUT: Actualizar guardia
const actualizarGuardia = async (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    DPI,
    Direccion,
    Telefono,
    Email,
    Estado,
    FechaContratacion,
    RolID,
  } = req.body;

  try {
    await db.query(
      `UPDATE Guardias SET
        Nombre = @Nombre,
        DPI = @DPI,
        Direccion = @Direccion,
        Telefono = @Telefono,
        Email = @Email,
        Estado = @Estado,
        FechaContratacion = @FechaContratacion,
        RolID = @RolID
      WHERE GuardiaID = @id`,
      {
        Nombre,
        DPI,
        Direccion,
        Telefono,
        Email,
        Estado,
        FechaContratacion,
        RolID,
        id: parseInt(id), // 👈 aquí el cambio importante
      }
    );

    res.json({ message: "Guardia actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar guardia", detalle: error.message });
  }
};

// DELETE: Eliminar guardia
const eliminarGuardia = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Guardias WHERE GuardiaID = @id", {
      id: parseInt(id),
    });
    res.json({ message: "Guardia eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar guardia", detalle: error.message });
  }
};

module.exports = {
  getGuardias,
  crearGuardia,
  actualizarGuardia,
  eliminarGuardia,
};
