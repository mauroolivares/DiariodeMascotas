const Mascota = require('../models/form_pet.model');
const funciones = require('../controllers/functions.controller');

exports.listaMascotas = async(usuario) => {
    return new Promise((resolve, reject) => {
        if (usuario.tipo == "Dueno") {
            Mascota.findAll({ where: { rutusuario: usuario.rut } }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        } else {
            Mascota.findAll({ where: { rutusuario: usuario.rutinstitucion } }).then(data => {
                console.log(data);
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        }
    })
}

exports.editarMascota = (mascota) => {
    Mascota.update(mascota, { where: { id: mascota.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando editar mascota.")
    });
}

exports.comprobarAgregarMascota = async(mascota, rutusuario) => {
    Mascota.findByPk(mascota.id).then(data => {
        if (data != undefined) {
            console.log("No se pudo crear la mascota porque ya existe una con la ID: " + mascota.id + ".");
        } else {
            crearMascota(mascota, rutusuario);
        }
    }).catch(err => {
        console.log(err.message);
    });
}

async function crearMascota(mascota, rutusuario) {
    mascota.id = funciones.generarID();
    mascota.rutusuario = rutusuario;

    console.log(mascota);

    Mascota.create(mascota).then(data => {
        console.log("Nueva mascota just dropped");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear Mascota.")
    });
}