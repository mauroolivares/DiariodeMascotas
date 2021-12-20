const Mascota = require('../models/form_pet.model');
const funciones = require('../controllers/functions.controller');
const Usuario = require('../models/user.model');
const logger = require('../config/logging.config')

//Hacer SELECT a todas las mascotas, dependiendo del tipo de usuario:
exports.listaMascotas = async(usuario) => {
    return new Promise((resolve, reject) => {
        if (usuario.tipo == "Dueno") {
            Mascota.findAll({
                include: [{
                    model: Usuario,
                }],
                where: { rutusuario: usuario.rut }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        } else {
            Mascota.findAll({ where: { rutusuario: usuario.rutinstitucion } }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err.message || "Ha ocurrido un error intentando crear usuario.")
            })
        }
    })
}

//Hacer UPDATE a la mascota asociada:
exports.editarMascota = (mascota) => {
    Mascota.update(mascota, { where: { id: mascota.id } }).then(data => {
        logger.log(`Mascota con id: ${mascota.id} y propietario: ${mascota.rutusuario} actualizada.`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar mascota.")
    });
}

//Verifica si la mascota con la ID generada existe, para determinar si se redirige a "crearMascota"
exports.comprobarAgregarMascota = async(mascota, rutusuario) => {
    mascota.id = funciones.generarID();
    Mascota.findByPk(mascota.id).then(data => {
        if (data != undefined) {
            logger.log(`No se pudo crear la mascota porque ya existe una con la ID: ${mascota.id}.`);
        } else {
            crearMascota(mascota, rutusuario);
        }
    }).catch(err => {
        logger.error(err.message);
    });
}

//Hacer INSERT a una mascota con sus datos especificados:
async function crearMascota(mascota, rutusuario) {
    mascota.id = funciones.generarID();
    mascota.rutusuario = rutusuario;

    Mascota.create(mascota).then(data => {
        logger.log(`Se ha añadido la mascota con id: "${mascota.id}" y el dueño "${mascota.rutusuario}" a la plataforma`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear Mascota.")
    });
}