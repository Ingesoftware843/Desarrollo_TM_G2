// Archivo: utils/alertasAutomatizadas.js
const db = require("../db/config");
const generarAlerta = require("./generaralerta");

// 🔔 1. Alerta: Sobrecupo en Estaciones
async function verificarSobrecupo(
  estacionID,
  capacidadEstimada,
  pasajerosActuales
) {
  if (pasajerosActuales >= capacidadEstimada * 1.5) {
    return await generarAlerta({
      TipoAlerta: "Sobrecupo en Estación",
      EstacionID: estacionID,
      Descripcion: `La estación ID ${estacionID} ha superado el 150% de su capacidad.`,
    });
  }
}

// 🔔 2. Alerta: Baja ocupación en Buses
async function verificarBajaOcupacion(busID, capacidadMaxima, pasajeros) {
  if (pasajeros < capacidadMaxima * 0.25) {
    return await generarAlerta({
      TipoAlerta: "Baja ocupación en Bus",
      BusID: busID,
      Descripcion: `El bus ID ${busID} tuvo menos del 25% de ocupación.`,
    });
  }
}

// 🔔 3. Cambio de parqueo de buses
async function verificarCambioParqueo(
  busID,
  parqueoAnteriorID,
  parqueoNuevoID
) {
  if (parqueoAnteriorID !== parqueoNuevoID) {
    return await generarAlerta({
      TipoAlerta: "Cambio de Parqueo de Bus",
      BusID: busID,
      Descripcion: `El bus ID ${busID} ha sido trasladado del parqueo ${parqueoAnteriorID} al ${parqueoNuevoID}.`,
    });
  }
}

// 🔔 4. Faltante de Guardia por Acceso
async function verificarFaltanteGuardias() {
  const result = await db.query(
    `SELECT A.AccesoID, COUNT(AG.GuardiaID) AS TotalGuardias
     FROM Accesos A
     LEFT JOIN AsignacionGuardias AG ON A.AccesoID = AG.AccesoID AND AG.EstadoID = 1
     GROUP BY A.AccesoID
     HAVING COUNT(AG.GuardiaID) < 1`
  );

  for (const row of result.recordset) {
    await generarAlerta({
      TipoAlerta: "Faltante de Guardia de Seguridad",
      EstacionID: null,
      Descripcion: `El acceso ID ${row.AccesoID} no tiene guardias asignados.`,
    });
  }
}

// 🔔 5. Asignación incorrecta de buses a líneas
async function verificarAsignacionesIncorrectas() {
  const result = await db.query(
    `SELECT L.LineaID, COUNT(B.BusID) AS BusesAsignados, COUNT(LE.EstacionID) AS Estaciones
     FROM Lineas L
     LEFT JOIN Buses B ON L.LineaID = B.LineaID
     LEFT JOIN LineasEstaciones LE ON L.LineaID = LE.LineaID
     GROUP BY L.LineaID
     HAVING COUNT(B.BusID) < COUNT(LE.EstacionID) OR COUNT(B.BusID) > COUNT(LE.EstacionID) * 2`
  );

  for (const row of result.recordset) {
    await generarAlerta({
      TipoAlerta: "Asignación Incorrecta de Buses a Líneas",
      Descripcion: `La línea ID ${row.LineaID} tiene una cantidad de buses no válida según su cantidad de estaciones.`,
    });
  }
}

// 🔔 6. Inexistencia de Datos Críticos
async function verificarDatosCriticos() {
  const estacionesSinLinea = await db.query(
    "SELECT EstacionID FROM Estaciones WHERE EstacionID NOT IN (SELECT EstacionID FROM LineasEstaciones)"
  );
  const estacionesSinAccesos = await db.query(
    "SELECT EstacionID FROM Estaciones WHERE EstacionID NOT IN (SELECT EstacionID FROM Accesos)"
  );
  const busesSinParqueo = await db.query(
    "SELECT BusID FROM Buses WHERE ParqueoID IS NULL"
  );
  const pilotosSinHistorial = await db.query(
    "SELECT P.PilotoID FROM Pilotos P WHERE NOT EXISTS (SELECT 1 FROM HistorialEducativo H WHERE H.PilotoID = P.PilotoID)"
  );

  for (const e of estacionesSinLinea.recordset) {
    await generarAlerta({
      TipoAlerta: "Estación sin Línea",
      EstacionID: e.EstacionID,
      Descripcion: `Estación ID ${e.EstacionID} no está asignada a ninguna línea.`,
    });
  }
  for (const e of estacionesSinAccesos.recordset) {
    await generarAlerta({
      TipoAlerta: "Estación sin Accesos",
      EstacionID: e.EstacionID,
      Descripcion: `Estación ID ${e.EstacionID} no tiene accesos registrados.`,
    });
  }
  for (const b of busesSinParqueo.recordset) {
    await generarAlerta({
      TipoAlerta: "Bus sin Parqueo",
      BusID: b.BusID,
      Descripcion: `Bus ID ${b.BusID} no tiene parqueo asignado.`,
    });
  }
  for (const p of pilotosSinHistorial.recordset) {
    await generarAlerta({
      TipoAlerta: "Piloto sin Historial Educativo",
      Descripcion: `Piloto ID ${p.PilotoID} no tiene historial educativo registrado.`,
    });
  }
}

module.exports = {
  verificarSobrecupo,
  verificarBajaOcupacion,
  verificarCambioParqueo,
  verificarFaltanteGuardias,
  verificarAsignacionesIncorrectas,
  verificarDatosCriticos,
};
