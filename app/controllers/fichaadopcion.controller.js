const Adopcion = require('../models/form_adoptform.model');
const Usuario = require('../models/user.model');
const Mascota = require('../models/form_pet.model');

exports.listaFichasAdopcion = async() => {
    return new Promise((resolve, reject) => {
        Adopcion.findAll({
            include: [{
                model: Mascota
            }]
        }).
        then(data => {
            resolve(data);
        }).catch(err => {
            reject(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    })
}

exports.editarAdopcion = async(ficha) => {
    Adopcion.update(ficha, { where: { id: ficha.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear ficha.")
    })
}

exports.comprobarAgregarFicha = async(ficha) => {
    Adopcion.findByPk(ficha.id).then(data => {
        if (data != undefined) {
            console.log("No se pudo crear el control porque ya existe uno con la ID: " + control.id + ".");
        } else {
            crearFicha(ficha, usuario);
        }
    }).catch(err => {
        console.log(err.message);
    });
}

async function crearFicha(ficha, usuario) {
    ficha.estado = "En Adopción";
    ficha.rutusuario = null;
    ficha.rutvet = usuario.rut;
    ficha.fecha = new Date();

    Adopcion.create(ficha).then(data => {
        console.log("Nueva ficha just dropped");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear Control.")
    });
}