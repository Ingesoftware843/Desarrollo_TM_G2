const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./db/config"); // Importamos la función query()

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Importar_rutas
const usuariosroutes = require("./routes/usuariosroutes");
const rolesroutes = require("./routes/rolesroutes");
const estadosroutes = require("./routes/estadosroutes");
const intentosloginroutes = require("./routes/intentosloginroutes");
const municipiosroutes = require("./routes/municipiosroutes");
const lineasroutes = require("./routes/lineasroutes");
const estacionesroutes = require("./routes/estacionesroutes");
const lineasestacionesroutes = require("./routes/lineasestacionesroutes");
const accesosroutes = require("./routes/accesosroutes");
const parqueosroutes = require("./routes/parqueosroutes");
const busesroutes = require("./routes/busesroutes");
const pilotosroutes = require("./routes/pilotosroutes");
const historialeducativoroutes = require("./routes/historialeducativoroutes");
const asignacionpilotosroutes = require("./routes/asignacionpilotosroutes");
const guardiasroutes = require("./routes/guardiasroutes");
const asignacionguardiasroutes = require("./routes/asignacionguardiasroutes");
const operadoresroutes = require("./routes/operadoresroutes");
const asignacionoperadoresroutes = require("./routes/asignacionoperadoresroutes");
const registroviajesroutes = require("./routes/registroviajesroutes");
const alertasroutes = require("./routes/alertasroutes");
const loginroutes = require("./routes/loginroutes");
const viajesUsuarioRoutes = require("./routes/viajesusuario");

// Usar_rutas
app.use("/api/usuarios", usuariosroutes);
app.use("/api/roles", rolesroutes);
app.use("/api/estados", estadosroutes);
app.use("/api/intentos-login", intentosloginroutes);
app.use("/api/municipalidades", municipiosroutes);
app.use("/api/lineas", lineasroutes);
app.use("/api/estaciones", estacionesroutes);
app.use("/api/lineas-estaciones", lineasestacionesroutes);
app.use("/api/accesos", accesosroutes);
app.use("/api/parqueos", parqueosroutes);
app.use("/api/buses", busesroutes);
app.use("/api/pilotos", pilotosroutes);
app.use("/api/historial-educativo", historialeducativoroutes);
app.use("/api/asignacion-pilotos", asignacionpilotosroutes);
app.use("/api/guardias", guardiasroutes);
app.use("/api/asignacion-guardias", asignacionguardiasroutes);
app.use("/api/operadores", operadoresroutes);
app.use("/api/asignacion-operadores", asignacionoperadoresroutes);
app.use("/api/registro-viajes", registroviajesroutes);
app.use("/api/alertas", alertasroutes);
app.use("/api/login", loginroutes);
app.use("/api/viajesusuario", viajesUsuarioRoutes);

// Validar conexión antes de iniciar el servidor
db.query("SELECT 1")
  .then(() => {
    console.log("✅ Conectado correctamente a la base de datos SQL Server");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor API escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  });
