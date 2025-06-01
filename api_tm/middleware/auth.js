const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token =
    req.cookies?.TokenAuth || // Login normal desde navegador
    req.headers["authorization"]?.split(" ")[1]; // Para pruebas con Postman o Thunder

  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
}

module.exports = verificarToken;
