module.exports = (sequelize, Sequelize) => {
    const Veterinario = sequelize.define("veterinario", {
        rut: {
            type: Sequelize.STRING(10),
            primaryKey: true
        },
        especialidad: {
            type: Sequelize.STRING,
            defaultValue: ""
        }
        //foreign key rutInstitucion
    });
    return Veterinario;
};