const db = require("../db/config");

// GET: Obtener todos los pilotos
const getPilotos = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Pilotos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pilotos" });
  }
};

// POST: Crear piloto
const crearPiloto = async (req, res) => {
  const {
    Nombre,
    DPI,
    Direccion,
    Telefono,
    Email,
    Estado,
    FechaContratacion,
    LicenciaTipo,
    FechaVencimientoLicencia,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO Pilotos 
        (Nombre, DPI, Direccion, Telefono, Email, Estado, FechaContratacion, LicenciaTipo, FechaVencimientoLicencia)
       VALUES 
        (@Nombre, @DPI, @Direccion, @Telefono, @Email, @Estado, @FechaContratacion, @LicenciaTipo, @FechaVencimientoLicencia)`,
      {
        Nombre,
        DPI,
        Direccion,
        Telefono,
        Email,
        Estado,
        FechaContratacion,
        LicenciaTipo,
        FechaVencimientoLicencia,
      }
    );

    res.status(201).json({ message: "Piloto creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear piloto" });
  }
};

// PUT: Actualizar piloto
// PUT: Actualizar piloto
const actualizarPiloto = async (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    DPI,
    Direccion,
    Telefono,
    Email,
    Estado = "Activo",
    FechaContratacion,
    LicenciaTipo,
    FechaVencimientoLicencia,
  } = req.body;

  try {
    await db.query(
      `UPDATE Pilotos SET
        Nombre = @Nombre,
        DPI = @DPI,
        Direccion = @Direccion,
        Telefono = @Telefono,
        Email = @Email,
        Estado = @Estado,
        FechaContratacion = @FechaContratacion,
        LicenciaTipo = @LicenciaTipo,
        FechaVencimientoLicencia = @FechaVencimientoLicencia
      WHERE PilotoID = @id`,
      {
        Nombre,
        DPI,
        Direccion,
        Telefono,
        Email,
        Estado,
        FechaContratacion,
        LicenciaTipo,
        FechaVencimientoLicencia,
        id: parseInt(id),
      }
    );

    res.json({ message: "Piloto actualizado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar piloto", detalle: error.message });
  }
};

// DELETE: Eliminar piloto
const eliminarPiloto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Pilotos WHERE PilotoID = @id", { id });
    res.json({ message: "Piloto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar piloto" });
  }
};

module.exports = {
  getPilotos,
  crearPiloto,
  actualizarPiloto,
  eliminarPiloto,
};
