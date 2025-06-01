const db = require("../db/config");
const generarAlerta = require("../utils/generaralerta");

const verificarTodo = async (req, res) => {
  try {
    // 1. Estaciones sin línea asignada
    const estacionesSinLinea = await db.query(`
      SELECT E.EstacionID, E.Nombre
      FROM Estaciones E
      LEFT JOIN LineasEstaciones LE ON E.EstacionID = LE.EstacionID
      WHERE LE.LineaID IS NULL
    `);
    for (const est of estacionesSinLinea.recordset) {
      await generarAlerta({
        TipoAlerta: "Estación sin Línea Asignada",
        EstacionID: est.EstacionID,
        BusID: 0,
        FechaHora: new Date(),
        Descripcion: `La estación "${est.Nombre}" no está asignada a ninguna línea.`,
      });
    }

    // 2. Estaciones sin accesos registrados
    const estacionesSinAccesos = await db.query(`
      SELECT E.EstacionID, E.Nombre
      FROM Estaciones E
      LEFT JOIN Accesos A ON E.EstacionID = A.EstacionID
      WHERE A.AccesoID IS NULL
    `);
    for (const est of estacionesSinAccesos.recordset) {
      await generarAlerta({
        TipoAlerta: "Estación sin Accesos",
        EstacionID: est.EstacionID,
        BusID: 0,
        FechaHora: new Date(),
        Descripcion: `La estación "${est.Nombre}" no tiene accesos registrados.`,
      });
    }

    // 3. Faltante de guardias por acceso
    const accesosSinGuardias = await db.query(`
      SELECT A.AccesoID, A.EstacionID, A.Descripcion
      FROM Accesos A
      LEFT JOIN AsignacionGuardias AG ON A.AccesoID = AG.AccesoID AND AG.FechaFin IS NULL
      WHERE AG.GuardiaID IS NULL
    `);
    for (const acc of accesosSinGuardias.recordset) {
      await generarAlerta({
        TipoAlerta: "Faltante de Guardia",
        EstacionID: acc.EstacionID,
        BusID: 0,
        FechaHora: new Date(),
        Descripcion: `El acceso "${acc.Descripcion}" no tiene ningún guardia asignado.`,
      });
    }

    // 4. Buses sin parqueo asignado
    const busesSinParqueo = await db.query(`
      SELECT BusID, Placa
      FROM Buses
      WHERE ParqueoID IS NULL
    `);
    for (const bus of busesSinParqueo.recordset) {
      await generarAlerta({
        TipoAlerta: "Bus sin Parqueo",
        EstacionID: 0,
        BusID: bus.BusID,
        FechaHora: new Date(),
        Descripcion: `El bus con placa "${bus.Placa}" no tiene parqueo asignado.`,
      });
    }

    // 5. Buses asignados incorrectamente por línea
    const lineasMalAsignadas = await db.query(`
      SELECT L.LineaID, L.Nombre,
             COUNT(DISTINCT LE.EstacionID) AS TotalEstaciones,
             COUNT(DISTINCT B.BusID) AS TotalBuses
      FROM Lineas L
      LEFT JOIN LineasEstaciones LE ON L.LineaID = LE.LineaID
      LEFT JOIN Buses B ON L.LineaID = B.LineaID
      GROUP BY L.LineaID, L.Nombre
      HAVING COUNT(DISTINCT B.BusID) < COUNT(DISTINCT LE.EstacionID)
          OR COUNT(DISTINCT B.BusID) > COUNT(DISTINCT LE.EstacionID) * 2
    `);
    for (const linea of lineasMalAsignadas.recordset) {
      await generarAlerta({
        TipoAlerta: "Asignación Incorrecta de Buses",
        EstacionID: 0,
        BusID: 0,
        FechaHora: new Date(),
        Descripcion: `La línea "${linea.Nombre}" tiene ${linea.TotalBuses} buses y ${linea.TotalEstaciones} estaciones. No cumple con el rango permitido.`,
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje: "Verificación completa. Alertas generadas correctamente.",
    });
  } catch (error) {
    console.error("❌ Error en verificación global:", error);
    return res.status(500).json({
      exito: false,
      mensaje: "Ocurrió un error durante la verificación global.",
      error: error.message,
    });
  }
};

module.exports = { verificarTodo };
