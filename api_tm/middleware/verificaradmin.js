function verificarRolPermitido(...rolesPermitidos) {
  return function (req, res, next) {
    const usuario = req.usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.RolID)) {
      return res.status(403).json({
        error: "Acceso denegado: no tienes permisos suficientes",
      });
    }

    next();
  };
}

module.exports = verificarRolPermitido;
