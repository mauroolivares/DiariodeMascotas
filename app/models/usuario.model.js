module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        rut: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        nombrecompleto: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        ubicacion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        },
        direccion: {
            type: Sequelize.STRING
        },
        fechanacimiento: {
            type: Sequelize.DATE
        }
    });

    return Usuario;
};