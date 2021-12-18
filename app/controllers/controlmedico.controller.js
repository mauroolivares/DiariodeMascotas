const Control = require('../models/form_control.model');
const Mascota = require('../models/form_pet.model');
const funciones = require('../controllers/functions.controller');

exports.listaControles = async(usuario) => {
    return new Promise((resolve, reject) => {
        if (usuario.tipo == "Dueno") {
            Control.findAll({
                include: [{
                    model: Mascota
                }],
                where: { rutusuario: usuario.rut },
                order: [
                    ['fecha', 'ASC']
                ]
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        } else {
            Control.findAll({
                include: [{
                    model: Mascota
                }],
                where: { rutusuario: usuario.rutinstitucion },
                order: [
                    ['fecha', 'ASC']
                ]
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        }
    })
}

exports.editarControl = async(control) => {
    Control.update(control, { where: { id: control.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

exports.comprobarAgregarControl = async(control, usuario) => {
    Control.findByPk(control.id).then(data => {
        if (data != undefined) {
            console.log("No se pudo crear el control porque ya existe uno con la ID: " + control.id + ".");
        } else {
            crearControl(control, usuario);
        }
    }).catch(err => {
        console.log(err.message);
    });
}

async function crearControl(control, usuario) {
    if (usuario.tipo == "Dueno") {
        control.rutusuario = usuario.rut;
        control.rutvet = null;
    } else {
        control.rutusuario = usuario.rutinstitucion;
        control.rutvet = usuario.rut
    }

    control.id = funciones.generarID();

    Control.create(control).then(data => {
        console.log("Nuevo control just dropped");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear Control.")
    });
}