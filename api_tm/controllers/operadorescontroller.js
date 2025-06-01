const db = require("../db/config");

// GET: Obtener todos los operadores con nombre del rol
const getOperadores = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT O.*, R.NombreRol
       FROM Operadores O
       LEFT JOIN Roles R ON O.RolID = R.RolID`
    );
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener operadores" });
  }
};

// POST: Crear operador
const crearOperador = async (req, res) => {
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
      `INSERT INTO Operadores 
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
    res.status(201).json({ message: "Operador creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear operador" });
  }
};

// PUT: Actualizar operador
const actualizarOperador = async (req, res) => {
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
      `UPDATE Operadores SET
        Nombre = @Nombre,
        DPI = @DPI,
        Direccion = @Direccion,
        Telefono = @Telefono,
        Email = @Email,
        Estado = @Estado,
        FechaContratacion = @FechaContratacion,
        RolID = @RolID
       WHERE OperadorID = @id`,
      {
        Nombre,
        DPI,
        Direccion,
        Telefono,
        Email,
        Estado,
        FechaContratacion,
        RolID,
        id,
      }
    );
    res.json({ message: "Operador actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar operador" });
  }
};

// DELETE: Eliminar operador
const eliminarOperador = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Operadores WHERE OperadorID = @id", { id });
    res.json({ message: "Operador eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar operador" });
  }
};

module.exports = {
  getOperadores,
  crearOperador,
  actualizarOperador,
  eliminarOperador,
};
