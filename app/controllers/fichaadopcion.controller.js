const Adopcion = require('../models/form_adoptform.model');
const Mascota = require('../models/form_pet.model');
const funciones = require('../controllers/functions.controller');
const logger = require('../config/logging.config')

//Hacer SELECT a todas las fichas de adopción existentes, junto a los datos de Mascota:
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

//Hacer UPDATE a la ficha de adpción asociada:
exports.editarAdopcion = async(ficha) => {
    Adopcion.update(ficha, { where: { id: ficha.id } }).then(data => {
        logger.log(`Ficha de Adopción con id: ${ficha.id} y mascota: ${ficha.idmascota} ha actualizado su estado a ${ficha.estado}.`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear ficha.")
    })
}

//Verifica si la ficha con la ID generada existe, para determinar si se redirige a "crearFicha"
exports.comprobarAgregarFicha = async(ficha, usuario) => {
    ficha.id = funciones.generarID();
    Adopcion.findByPk(ficha.id).then(data => {
        if (data != undefined) {
            logger.log(`No se pudo crear la ficha porque ya existe una con la ID: ${ficha.id}.`);
        } else {
            crearFicha(ficha, usuario);
        }
    }).catch(err => {
        logger.error(err.message);
    });
}

//Hacer INSERT a una ficha de Adopción con sus datos especificados:
async function crearFicha(ficha, usuario) {
    ficha.estado = "En Adopcion";
    ficha.rutusuario = null;
    ficha.rutvet = usuario.rut;
    ficha.fecha = new Date();

    Adopcion.create(ficha).then(data => {
        logger.log(`Se ha creado la adopción con id: "${ficha.id}" para la mascota de codigo "${control.idmascota}"`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear Control.")
    });
}