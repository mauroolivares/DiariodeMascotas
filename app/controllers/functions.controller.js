const Mascota = require('../models/form_pet.model');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Control = require('../models/form_control.model');
const Adopcion = require('../models/form_adoptform.model');
/*
const { QueryTypes } = require('sequelize');

await sequelize.query(
    'SELECT * FROM projects WHERE status = ?', {
        replacements: ['active'],
        type: QueryTypes.SELECT
    }
);
*/

exports.generarID = () => {
    return (Math.round(Math.random() * (65536 - 1) + (1))).toString();
}

exports.transformarFecha = (fechastring) => {
    var fecha = new Date(fechastring)
    return fecha.toLocaleDateString("sp-Us");
}