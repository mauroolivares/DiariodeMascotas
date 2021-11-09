const Sequelize = require('sequelize');
const sequelize = require('./sequelize_index').sequelize;

const Mascota = sequelize.define("mascota", {
    id: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    fechanacimiento: {
        type: Sequelize.DATE
    },
    especie: {
        type: Sequelize.STRING
    },
    razacolor: {
        type: Sequelize.STRING
    },
    sexo: {
        type: Sequelize.STRING
    },
    esterilizado: {
        type: Sequelize.STRING
    },
    tienechip: {
        type: Sequelize.STRING
    },
    desparasitado: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },

    //foreign key rutdueño/institucion
});

module.exports = Mascota;