const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const configuracoesRoutes = require('./routes/configuracoes');

const app = express();

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Servir a página de administração
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', configuracoesRoutes);

// Porta em que o servidor vai ouvir as requisições
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
