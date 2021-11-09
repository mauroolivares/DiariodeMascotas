const Sequelize = require('sequelize');
const sequelize = require('./sequelize_index').sequelize;
const Dueno = sequelize.define("dueno", {
    rut: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: " "
    }
    //foreign key rut
});

module.exports = Dueno;