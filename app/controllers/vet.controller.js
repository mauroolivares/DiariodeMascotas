const Mascota = require('../models/form_pet.model')
const Adopcion = require('../models/form_adoptform.model')
const Institucion = require('../models/user_instit.model')
const funciones = require('../controllers/functions.controller')
const { Op } = require("sequelize");
const Veterinario = require('../models/user_vet.model');
const Usuario = require('../models/user.model');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Veterinario") {
            //pagina tipo "404"
            console.log("no eres veterinario")
            res.redirect("/")
        } else {
            next()
        }
    }
}

exports.Menu = (req, res) => {
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
        res.render('perfilVeterinario', { veterinario: req.user, instituciones: data })
        console.log(req.user)
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });

}

exports.editarDatosVet = async(req, res) => {
    const usuario = {
        rut,
        correo,
        password,
        nombrecompleto,
        descripcion,
        ubicacion,
        telefono,
        direccion,
        fechanacimiento,
        especialidad,
        rutinstitucion
    } = req.body;
    Usuario.update(usuario, { where: { rut: req.user.rut } }).then(data1 => {
        Veterinario.update(usuario, { where: { rut: req.user.rut } }).then(data2 => {
            console.log("Veterinario y Usuario Actualizado.")
            res.redirect("/logout");
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

exports.MenuMascotas = (req, res) => {
    if (req.user == undefined) {
        Mascota.findAll({ where: { rutusuario: '555' } }).then(data => {
            console.log(data);
            res.render('mascotasUsuario', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    } else {
        Mascota.findAll({ where: { rutusuario: req.user.rutinstitucion } }).then(data => {
            res.render('mascotasUsuario', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    }
}

exports.addMascota = async(req, res) => {
    console.log(req.body)
    const mascota = {
        id,
        nombre,
        fechanacimiento,
        especie,
        razacolor,
        sexo,
        esterilizado,
        tienechip,
        desparasitado,
        estado,
        descripcion,
        rutusuario
    } = req.body;
    var mascotaID = funciones.generarID();
    mascota.id = mascotaID;
    mascota.rutusuario = req.user.institucion;

    Mascota.create(mascota).then(data => {
        console.log(data);
        console.log("Nueva mascota just dropped");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/profile/pets');
}

exports.editMascota = async(req, res) => {
    const mascota = {
        id,
        nombre,
        fechanacimiento,
        especie,
        razacolor,
        sexo,
        esterilizado,
        tienechip,
        desparasitado,
        estado,
        descripcion
    } = req.body;

    Mascota.update(mascota, { where: { id: mascota.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/profile/pets');
}


exports.ponerEnAdopcion = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        fechaInicio,
        rutvet,
        rutusuario,
        idmascota
    } = req.body;
    fichaAdopcion.estado = "Dar en Adopción";
    fichaAdopcion.rutusuario = req.user.rutinstitucion;
    fichaAdopcion.rutvet = req.user.rut;
    fichaAdopcion.fecha = new Date();

    Adopcion.create(fichaAdopcion).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    });
    res.redirect('/vet')
}

//Esto es para cuando se acepta o rechaza una adopcion que un dueño entrega a la pagina:
exports.responderAdopcion = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        fechaInicio,
        rutvet,
        rutusuario,
        idmascota
    } = req.body;
    let exDueno = fichaAdopcion.rutusuario
    fichaAdopcion.rutvet = req.user.rut;
    fichaAdopcion.rutusuario = req.user.rutinstitucion;

    Adopcion.update(fichaAdopcion, { where: { id: fichaAdopcion.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    })

    let ide = fichaAdopcion.id + "FIN"
    fichaAdopcion.id = ide;
    fichaAdopcion.rutusuario = exDueno;
    fichaAdopcion.fecha = new Date();
    Adopcion.create(fichaAdopcion).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    });
    res.redirect("/vet");
}

//Esto es para cuando se acepta o rechaza la solicitud de adoptar de un dueño:
exports.responderSolicitud = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        nuevodueno,
        fechaInicio,
        rutvet,
        rutusuario,
        idmascota
    } = req.body;

    fichaAdopcion.rutvet = req.user.rut;
    //Ficha para institucion:
    Adopcion.update(fichaAdopcion, { where: { id: fichaAdopcion.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    })

    let ide = fichaAdopcion.id + "FIN"
    fichaAdopcion.id = ide;

    //Ficha para usuario:
    fichaAdopcion.rutusuario = fichaAdopcion.nuevodueno;
    Adopcion.create(fichaAdopcion).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    });

    if (fichaAdopcion.estado == "Aceptado") {
        let mascota = {
            rutusuario: fichaAdopcion.rutusuario
        }
        Mascota.update(mascota, { where: { id: fichaAdopcion.idmascota } }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
        });
    }
    res.redirect("/vet");
}