const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Institucion = sequelize.define("institucion", {
    rut: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    area: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    totalfunc: {
        type: Sequelize.INTEGER
    },
    totalpuestos: {
        type: Sequelize.INTEGER
    }
    //foreign key rut
});

module.exports = Institucion;