const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_dueno.model')
const logger = require('../config/logging.config')
const { Op } = require("sequelize");

//Listar a todos los usuarios existentes:
exports.listaUsuarios = async() => {
    return new Promise((resolve, reject) => {
        Usuario.findAll().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    })
}

//Listar a todas las instituciones que tengan vacantes disponibles:
exports.listaInstituciones = async() => {
    return new Promise((resolve, reject) => {
        Usuario.findAll({
            include: [{
                model: Institucion,
                where: {
                    totalfunc: {
                        [Op.gte]: 0
                    }
                }
            }]
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    })
}

//Listar a todos los veterinarios de una institución asociada:
exports.listaVeterinarios = async(rut) => {
    return new Promise((resolve, reject) => {
        Usuario.findAll({
            include: [{
                model: Veterinario,
                where: {
                    rutinstitucion: rut
                }
            }]
        }).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    })
}
//Hacer UPDATE al usuario seleccionado:
exports.editarUsuario = (usuario) => {
    Usuario.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        logger.log(`Datos del usuario con rut: "${usuario.rut}", se han actualizado.`)
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar al usuario.")
    });
}

//Hacer UPDATE a la institución seleccionada:
exports.editarInstitucion = (usuario) => {
    Institucion.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        logger.log(`Datos de la Institución con rut: "${usuario.rut}", se han actualizado.`)
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar la Institución.")
    });
}

//Hacer UPDATE al veterinario seleccionado:
exports.editarVeterinario = (usuario) => {
    Veterinario.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        logger.log(`Datos del Veterinario con rut: "${usuario.rut}", se han actualizado.`)
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar al Veterinario.")
    });
}

//Hacer UPDATE al dueño seleccionado:
exports.editarDueno = (usuario) => {
    Dueno.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        logger.log(`Datos del Dueño con rut: "${usuario.rut}", se han actualizado.`)
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando editar al Dueño.")
    });
}

//Comprueba si el usuario existe, sino avanza a la siguiente función "crearUsuario":
exports.comprobarAgregarUsuario = async(usuario) => {
    Usuario.findByPk(usuario.rut).then(data => {
        if (data != undefined) {
            logger.log(`No se pudo crear el usuario porque ya existe uno con el rut: "${usuario.rut}".`);
        } else {
            crearUsuario(usuario);
        }
    }).catch(err => {
        logger.error(err.message);
    });
}

//Crea el Usuario y su tipo asociado:
async function crearUsuario(usuario) {
    logger.log("Creando...")
    usuario.password = await bcrypt.hash(usuario.password, 10);
    Usuario.create(usuario).then(data => {
        logger.log(`Usuario con rut: "${usuario.rut}", creado.`)
        switch (usuario.tipo) {
            case "Administrador":
                crearAdministrador(usuario);
                break;

            case "Institucion":
                crearInstitucion(usuario);
                break;

            case "Veterinario":
                crearVeterinario(usuario);
                break;

            case "Dueño":
                crearDueño(usuario);
                break;
        };
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

//Crear distintos tipos de usuario (Administrador, Institución, Veterinario, Dueño):
async function crearAdministrador(usuario) {
    Administrador.create(usuario).then(data => {
        logger.log(`${usuario.rut}: Asignado como Administrador`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

async function crearInstitucion(usuario) {
    Institucion.create(usuario).then(data => {
        logger.log(`${usuario.rut} + ": Asignado como Institución`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

async function crearVeterinario(usuario) {
    usuario.rutinstitucion = null
    Veterinario.create(usuario).then(data => {
        logger.log(`${usuario.rut} + : Asignado como Veterinario`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

async function crearDueño(usuario) {
    Dueno.create(usuario).then(data => {
        logger.log(`${usuario.rut} + ": Asignado como Dueño de mascotas`);
    }).catch(err => {
        logger.error(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}