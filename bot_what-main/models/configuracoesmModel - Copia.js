const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_config');

const Configuracao = sequelize.define('configuracao', {
  saudacao: {
    type: DataTypes.TEXT
  },
  mensagemPadrao: {
    type: DataTypes.TEXT,
    field: 'mensagem_padrao'
  },
  tempoResposta: {
    type: DataTypes.INTEGER,
    field: 'tempo_resposta'
  },
  tempoEsperaRepeticao: {
    type: DataTypes.INTEGER,
    field: 'tempo_espera_repeticao'
  },
  responderPara: {
    type: DataTypes.ENUM('contatos', 'grupos', 'ambos'),
    field: 'responder_para'
  }
}, {
  tableName: 'configuracoes_bot',
  timestamps: false  // Não queremos timestamps automáticos para esse modelo
});

module.exports = Configuracao;
