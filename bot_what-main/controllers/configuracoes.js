const express = require('express');
const router = express.Router();
const configuracoesController = require('../controllers/configuracoesController');

// Rota para salvar as configurações
router.post('/salvar-configuracoes', configuracoesController.salvarConfiguracoes);

module.exports = router;
