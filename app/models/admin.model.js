module.exports = (sequelize, Sequelize) => {
    const Administrador = sequelize.define("administrador", {
            rut: {
                type: Sequelize.STRING(10),
                primaryKey: true
            }
        })
        //rut usuario;
    return Administrador;
}