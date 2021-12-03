const Mascota = require('../models/form_pet.model');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Control = require('../models/form_control.model');
const Adopcion = require('../models/form_adoptform.model');

exports.generarID = () => {
    return (Math.round(Math.random() * (65536 - 1) + (1))).toString();
}

exports.usuarioNoExiste = async(rut) => {
    Usuario.findByPk(rut).then(data => {
        console.log(data)
        if (data == null) {
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error en la consulta SQL.")
    });
};

exports.mascotaNoExiste = async(mascotaid) => {
    Mascota.findByPk(mascotaid).then(data => {
        console.log(data)
        if (data == null) {
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error en la consulta SQL.")
    });
};

exports.controlNoExiste = async(controlid) => {
    Control.findByPk(controlid).then(data => {
        if (data[0] == null) {
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error en la consulta SQL.")
    });
};

exports.adopcionNoExiste = async(fichaid) => {
    Adopcion.findByPk(fichaid).then(data => {
        if (data[0] == null) {
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error en la consulta SQL.")
    });
};

exports.transformarFecha = (fechastring) => {
    var fecha = new Date(fechastring)
    return fecha.toLocaleDateString("sp-Us");
}