const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize.config').sequelize;

const Usuario = sequelize.define("usuario", {
    rut: {
        type: Sequelize.STRING(10),
        primaryKey: true
    },
    correo: {
        type: Sequelize.STRING,
        defaultValue: " "
    },
    password: {
        type: Sequelize.STRING
    },
    nombrecompleto: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING,
        defaultValue: " "
    },
    ubicacion: {
        type: Sequelize.STRING,
        defaultValue: " "
    },
    telefono: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    direccion: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    fechanacimiento: {
        type: Sequelize.DATE,
        defaultValue: 01 - 01 - 1900
    }
});

Usuario.isValidPassword = async(password) => {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = Usuario;