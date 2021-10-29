const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const Control = sequelize.define("controlmedico", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: 01 - 01 - 1900
    },
    peso: {
        type: Sequelize.FLOAT
    },
    temperatura: {
        type: Sequelize.FLOAT,
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