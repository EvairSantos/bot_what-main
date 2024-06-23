const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_config');

const InteracaoResposta = sequelize.define('interacao_resposta', {
  textoInteracao: {
    type: DataTypes.TEXT,
    field: 'texto_interacao'
  }
}, {
  tableName: 'interacoes_resposta',
  timestamps: false
});

module.exports = InteracaoResposta;
