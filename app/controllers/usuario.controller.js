const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_dueno.model')
const { Op } = require("sequelize");

//Sitio para iniciar sesion:
exports.loginpage = (req, res) => {
    req.logout();
    res.render('paginaPrincipal');
}

//Sitio para registrar usuario fuera de sesión:
exports.signpage = (req, res) => {
    res.render('register');
}

//Función para cerrar sesion:
exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

//Funcion para redirigir inicio de sesión:
exports.login = async(req, res) => {
    switch (req.user.tipo) {
        case "Administrador":
            res.redirect("/admin")
            break;

        case "Institucion":
            res.redirect("/instit")
            break;

        case "Veterinario":
            res.redirect("/vet")
            break;

        case "Dueno":
            res.redirect("/profile")
            break;
    }
    res.end()
}

exports.listaUsuarios = async() => {
    return new Promise((resolve, reject) => {
        Usuario.findAll().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    })
}

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

exports.editarUsuario = (usuario) => {
    Usuario.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        console.log("Datos del usuario con rut: " + usuario.rut + ", se han actualizado.")
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando editar al usuario.")
    });
}

exports.editarInstitucion = (usuario) => {
    Institucion.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        console.log("Datos del Institución con rut: " + usuario.rut + ", se han actualizado.")
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando editar la Institución.")
    });
}

exports.editarVeterinario = (usuario) => {
    Veterinario.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        console.log("Datos del Veterinario con rut: " + usuario.rut + ", se han actualizado.")
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando editar al Veterinario.")
    });
}

exports.editarDueno = (usuario) => {
    Dueno.update(usuario, { where: { rut: usuario.rut } }).then(data => {
        console.log("Datos del Dueño con rut: " + usuario.rut + ", se han actualizado.")
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando editar al Dueño.")
    });
}

//Comprueba si el usuario existe.
exports.comprobarAgregarUsuario = async(usuario) => {
    Usuario.findByPk(usuario.rut).then(data => {
        if (data != undefined) {
            console.log("No se pudo crear el usuario porque ya existe uno con el rut: " + usuario.rut + ".");
        } else {
            crearUsuario(usuario);
        }
    }).catch(err => {
        console.log(err.message);
    });
}

//Crea el Usuario y su tipo asociado.
async function crearUsuario(usuario) {
    console.log("Creando...")
    usuario.password = await bcrypt.hash(usuario.password, 10);
    Usuario.create(usuario).then(data => {
        console.log("Usuario con rut: " + usuario.rut + ", creado.");
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
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

//Crear distintos tipos de usuario:
async function crearAdministrador(usuario) {
    Administrador.create(usuario).then(data => {
        console.log(usuario.rut + ": Asignado como Administrador");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

async function crearInstitucion(usuario) {
    Institucion.create(usuario).then(data => {
        console.log(usuario.rut + ": Asignado como Institución");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

async function crearVeterinario(usuario) {
    usuario.rutinstitucion = null
    Veterinario.create(usuario).then(data => {
        console.log(usuario.rut + ": Asignado como Veterinario");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    console.log(usuario);
}

async function crearDueño(usuario) {
    Dueno.create(usuario).then(data => {
        console.log(usuario.rut + ": Asignado como Dueño de mascotas");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}