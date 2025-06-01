const db = require("../db/config");

// GET: Obtener todas las municipalidades
const getMunicipios = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Municipalidades");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener municipalidades" });
  }
};

// POST: Crear nueva municipalidad
const crearMunicipio = async (req, res) => {
  const { Nombre, Region, Telefono, Email } = req.body;

  try {
    await db.query(
      `INSERT INTO Municipalidades (Nombre, Region, Telefono, Email)
       VALUES (@Nombre, @Region, @Telefono, @Email)`,
      { Nombre, Region, Telefono, Email }
    );

    res.status(201).json({ message: "Municipalidad creada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear municipalidad" });
  }
};

// PUT: Actualizar municipalidad
const actualizarMunicipio = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Region, Telefono, Email } = req.body;

  try {
    await db.query(
      `UPDATE Municipalidades SET
        Nombre = @Nombre,
        Region = @Region,
        Telefono = @Telefono,
        Email = @Email
      WHERE MunicipalidadID = @id`,
      { Nombre, Region, Telefono, Email, id }
    );

    res.json({ message: "Municipalidad actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar municipalidad" });
  }
};

// DELETE: Eliminar municipalidad
const eliminarMunicipio = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Municipalidades WHERE MunicipalidadID = @id", {
      id,
    });
    res.json({ message: "Municipalidad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar municipalidad" });
  }
};

module.exports = {
  getMunicipios,
  crearMunicipio,
  actualizarMunicipio,
  eliminarMunicipio,
};
