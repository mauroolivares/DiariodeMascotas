const Mascota = require('../models/form_pet.model')
const Adopcion = require('../models/form_adoptform.model')
const Institucion = require('../models/user_instit.model')
const funciones = require('../controllers/functions.controller')
const { Op } = require("sequelize");
const Veterinario = require('../models/user_vet.model');
const Usuario = require('../models/user.model');
const Control = require('../models/form_control.model');

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

exports.MascotasMenu = (req, res) => {
    Mascota.findAll({ where: { rutusuario: req.user.rutinstitucion } }).then(data => {
        res.render('mascotas', { mascotas: data, usuario: req.user })
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })

}

exports.ControlesMenu = async(req, res) => {
    Control.findAll({
        include: [{
            model: Mascota
        }],
        where: { rutusuario: req.user.rutinstitucion },
        order: [
            ['fecha', 'ASC']
        ]
    }).then(data1 => {
        console.log(data1);
        Mascota.findAll({ where: { rutusuario: req.user.rutinstitucion } }).then(data2 => {
            res.render('controles', { controles: data1, mascotas: data2, usuario: req.user })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })

    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })

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
    mascota.rutusuario = req.user.rutinstitucion;

    Mascota.create(mascota).then(data => {
        console.log(data);
        console.log("Nueva mascota just dropped");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/vet/pets');

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
    res.redirect('/vet/pets');
}

exports.addControl = async(req, res) => {
    const control = {
        fecha,
        peso,
        temperatura,
        vacuna,
        estado,
        observacion,
        idmascota
    } = req.body
    control.id = funciones.generarID();
    control.rutusuario = req.user.rutinstitucion;
    control.rutvet = req.user.rut;
    Control.create(control).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });

    res.redirect('/vet/controls');
}

exports.editControl = async(req, res) => {
    const control = {
        id,
        fecha,
        peso,
        temperatura,
        vacuna,
        estado,
        observacion,
        idmascota
    } = req.body;
    Control.update(control, { where: { id: control.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/vet/controls');
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
    fichaAdopcion.estado = "En Adopción";
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