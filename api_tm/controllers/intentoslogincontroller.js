const { sql, config } = require('../db/config');

const getIntentos = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM IntentosLogin');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createIntento = async (req, res) => {
  const { UsuarioID, Exitoso } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('UsuarioID', sql.Int, UsuarioID)
      .input('Exitoso', sql.Bit, Exitoso)
      .query('INSERT INTO IntentosLogin (UsuarioID, Exitoso) VALUES (@UsuarioID, @Exitoso)');
    res.status(201).send('Intento registrado');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getIntentos, createIntento };
