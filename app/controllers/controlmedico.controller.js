const Control = require('../models/form_control.model');
const Mascota = require('../models/form_pet.model');
const funciones = require('../controllers/functions.controller');
const logger = require('../config/logging.config')

//Hacer SELECT a todos los controles médicos, dependiendo del tipo de usuario:
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

//Hacer UPDATE en el control médico asociado:
exports.editarControl = async(control) => {
    Control.update(control, { where: { id: control.id } }).then(data => {
        logger.log(`Control con id: ${control.id} y mascota: ${control.idmascota} actualizado.`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar control.")
    });
}

//Hacer UPDATE en todos los controles médicos de una mascota para asociarlas a un nuevo dueño (cuando un dueño adopta):
exports.editarControlesMascotas = async(idmascota, rutusuario) => {
    Control.update({ rutusuario: rutusuario }, { where: { idmascota: idmascota } }).then(data => {
        logger.log(`Controles de mascota: ${idmascota} se han actualizado, ahora pertenecen a ${rutusuario}.`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

//Verifica si el control con la ID generada existe, para determinar si se redirige a "crearControl"
exports.comprobarAgregarControl = async(control, usuario) => {
    control.id = funciones.generarID();
    Control.findByPk(control.id).then(data => {
        if (data != undefined) {
            logger.log(`No se pudo crear el control porque ya existe uno con la ID: ${control.id}.`);
        } else {
            crearControl(control, usuario);
        }
    }).catch(err => {
        logger.error(err.message);
    });
}

//Hacer INSERT a un control con sus datos especificados:
async function crearControl(control, usuario) {
    if (usuario.tipo == "Dueno") {
        control.rutusuario = usuario.rut;
        control.rutvet = null;
    } else {
        control.rutusuario = usuario.rutinstitucion;
        control.rutvet = usuario.rut
    }

    Control.create(control).then(data => {
        logger.log(`Se ha añadido el control con id: "${control.id}" a la mascota de codigo "${control.idmascota}"`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear Control.")
    });
}