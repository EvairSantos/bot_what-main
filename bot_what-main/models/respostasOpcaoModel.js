const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_config');

const RespostaOpcao = sequelize.define('resposta_opcao', {
  textoResposta: {
    type: DataTypes.TEXT,
    field: 'texto_resposta'
  }
}, {
  tableName: 'respostas_opcao',
  timestamps: false
});

module.exports = RespostaOpcao;
