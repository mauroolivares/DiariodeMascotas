const Sequelize = require('sequelize');
const sequelize = require('./sequelize_index').sequelize;

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
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    totalpuestos: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
    //foreign key rut
});

module.exports = Institucion;