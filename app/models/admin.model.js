module.exports = (sequelize, Sequelize) => {
    const db = require("../models");
    const Usuario = db.usuario;
    const Administrador = sequelize.define("administrador", {
        rut: {
            type: Sequelize.STRING(10),
            primaryKey: true
        }
    })
    Administrador.belongsTo(Usuario);
    return Administrador;
}