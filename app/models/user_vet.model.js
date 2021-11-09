const Sequelize = require('sequelize');
const sequelize = require('./sequelize_index').sequelize;

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

module.exports = Veterinario;