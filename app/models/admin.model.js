const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Administrador = sequelize.define("administrador", {
    rut: {
        type: Sequelize.STRING(10),
        primaryKey: true
    }
});
//rut usuario;


module.exports = Administrador