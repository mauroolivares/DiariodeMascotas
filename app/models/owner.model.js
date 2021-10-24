module.exports = (sequelize, Sequelize) => {
    const Dueno = sequelize.define("dueno", {
        rut: {
            type: Sequelize.STRING(10),
            primaryKey: true
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: ""
        }
        //foreign key rut
    });
    return Dueno;
};