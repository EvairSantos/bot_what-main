const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_config');

const OpcaoMenu = sequelize.define('opcao_menu', {
  textoOpcao: {
    type: DataTypes.TEXT,
    field: 'texto_opcao'
  }
}, {
  tableName: 'opcoes_menu',
  timestamps: false
});

module.exports = OpcaoMenu;
