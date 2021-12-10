const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.config').sequelize;

const Control = sequelize.define("controlmedico", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.DATE
    },
    peso: {
        type: Sequelize.FLOAT
    },
    temperatura: {
        type: Sequelize.FLOAT
    },
    vacuna: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    estado: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    observacion: {
        type: Sequelize.STRING
    }
    //foreign key mascota
    //foreign key dueño/INSTITUCION
    //foreign key veterinario
});

module.exports = Control;