const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.config').sequelize;

const Usuario = sequelize.define("usuario", {
    rut: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    correo: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    password: {
        type: Sequelize.STRING
    },
    nombrecompleto: {
        type: Sequelize.STRING,
    },
    descripcion: {
        type: Sequelize.STRING,
        defaultValue: "Vacio"
    },
    ubicacion: {
        type: Sequelize.STRING,
        defaultValue: "Vacio"
    },
    telefono: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    direccion: {
        type: Sequelize.STRING,
        defaultValue: "Vacio"
    },
    fechanacimiento: {
        type: Sequelize.DATE
    }
});

module.exports = Usuario;