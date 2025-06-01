const express = require('express');
const router = express.Router();
const { getIntentos, createIntento } = require('../controllers/intentoslogincontroller');

router.get('/', getIntentos);
router.post('/', createIntento);

module.exports = router;
