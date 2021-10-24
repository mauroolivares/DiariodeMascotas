module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        rut: {
            type: Sequelize.STRING(10),
            primaryKey: true
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
            type: Sequelize.STRING,
            defaultValue: ""
        },
        ubicacion: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        telefono: {
            type: Sequelize.INTEGER,
            defaultValue: ""
        },
        direccion: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        fechanacimiento: {
            type: Sequelize.DATE,
            defaultValue: ""
        }
    });
    return Usuario;
};