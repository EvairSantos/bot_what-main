// routes/configRoutes.js

const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

// Rota para obter as configurações do bot
router.get('/', configController.getConfiguracoes);

// Rota para salvar as configurações do bot
router.post('/', configController.salvarConfiguracoes);

module.exports = router;
