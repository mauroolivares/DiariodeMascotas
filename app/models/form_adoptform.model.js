const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.config').sequelize;

const fichaAdopcion = sequelize.define("fichaadopcion", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: 01 - 01 - 1900
    },
    observacion: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: ""
    }
    //foreign key veterinario
    //foreign key dueño/institucion
    //foreign key mascota
});

module.exports = fichaAdopcion;