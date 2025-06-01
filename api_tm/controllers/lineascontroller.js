const db = require("../db/config");

// GET: Obtener todas las líneas
const getLineas = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT L.*, M.Nombre AS Municipalidad
       FROM Lineas L
       JOIN Municipalidades M ON L.MunicipalidadID = M.MunicipalidadID`
    );
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener líneas" });
  }
};

// POST: Crear nueva línea
const crearLinea = async (req, res) => {
  const { Nombre, MunicipalidadID, MapaURL, DistanciaTotal, Estado } = req.body;

  try {
    await db.query(
      `INSERT INTO Lineas (Nombre, MunicipalidadID, MapaURL, DistanciaTotal, Estado)
       VALUES (@Nombre, @MunicipalidadID, @MapaURL, @DistanciaTotal, @Estado)`,
      { Nombre, MunicipalidadID, MapaURL, DistanciaTotal, Estado }
    );

    res.status(201).json({ message: "Línea creada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear línea" });
  }
};

// PUT: Actualizar línea
const actualizarLinea = async (req, res) => {
  const { id } = req.params;
  const { Nombre, MunicipalidadID, MapaURL, DistanciaTotal, Estado } = req.body;

  try {
    await db.query(
      `UPDATE Lineas SET
        Nombre = @Nombre,
        MunicipalidadID = @MunicipalidadID,
        MapaURL = @MapaURL,
        DistanciaTotal = @DistanciaTotal,
        Estado = @Estado
      WHERE LineaID = @id`,
      { Nombre, MunicipalidadID, MapaURL, DistanciaTotal, Estado, id }
    );

    res.json({ message: "Línea actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar línea" });
  }
};

// DELETE: Eliminar línea
const eliminarLinea = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM Lineas WHERE LineaID = @id", { id });
    res.json({ message: "Línea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar línea" });
  }
};

module.exports = {
  getLineas,
  crearLinea,
  actualizarLinea,
  eliminarLinea,
};
