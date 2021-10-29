const Sequelize = require('sequelize');
const sequelize = require('./index').sequelize;

const fichaAdopcion = sequelize.define("fichaadopcion", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    observacion: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    fechaInicio: {
        type: Sequelize.DATE,
        defaultValue: 01 - 01 - 1900
    }
    //foreign key veterinario
    //foreign key dueño/institucion
    //foreign key mascota
});

module.exports = fichaAdopcion;