const Mascota = require('../models/form_pet.model');
const Usuario = require('../models/user.model');
const Dueno = require('../models/user_dueno.model');
const Control = require('../models/form_control.model');
const Adopcion = require('../models/form_adoptform.model');
const funciones = require('../controllers/functions.controller');

//Autenticacion
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Dueno") {
            //pagina tipo "404"
            console.log("no eres dueño")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de dueño:
exports.Menu = (req, res) => {
    console.log(req.user)
        //send datos de req.user
    res.render('perfilDueño', { dueno: req.user })
}

//Mascotas de dueño:
exports.MascotaMenu = async(req, res) => {
    if (req.user == undefined) {
        Mascota.findAll({ where: { rutusuario: '666' } }).then(data => {
            console.log(data);
            res.render('mascotasDueño', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    } else {
        Mascota.findAll({ where: { rutusuario: req.user.rut } }).then(data => {
            res.render('mascotasDueño', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    }
}

exports.ControlesMenu = async(req, res) => {
    if (req.user == undefined) {
        Control.findAll({ where: { rutusuario: '666' } }).then(data1 => {
            console.log(data1);
            Mascota.findAll({ where: { rutusuario: '666' } }).then(data2 => {
                res.render('controlesDueño', { controles: data1, mascotas: data2 })
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            })

        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    } else {
        Control.findAll({ where: { rutusuario: req.user.rut } }).then(data1 => {
            console.log(data1);
            Mascota.findAll({ where: { rutusuario: req.user.rut } }).then(data2 => {
                res.render('controlesDueño', { controles: data1, mascotas: data2 })
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            })

        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    }
}

exports.editarDatosDueno = async(req, res) => {
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
        estado
    } = req.body;
    Usuario.update(usuario, { where: { rut: req.user.rut } }).then(data1 => {
        Dueno.update(usuario, { where: { rut: req.user.rut } }).then(data2 => {
            console.log("Dueño y Usuario Actualizado.")
            res.redirect("/logout");
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
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
    mascota.rutusuario = req.user.rut;

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

exports.addControl = async(req, res) => {
    const control = {
        id,
        fecha,
        peso,
        temperatura,
        vacuna,
        estado,
        observacion,
        idmascota
    }
    var controlID = funciones.generarID();
    while (!funciones.controlNoExiste(controlID)) {
        controlID = funciones.generarID();
    }

    let fechaString = funciones.transformarFecha(control.fecha);
    control.fecha = fechaString;
    control.id = controlID;
    control.rutusuario = req.user.rut;
    control.rutvet = null;
    Control.create(control).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/profile/pets');
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
    }
    let fechaString = funciones.transformarFecha(control.fecha);
    control.fecha = fechaString;
    Control.update(control, { where: { id: control.id } }).then(data => {
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
    var fichaID = funciones.generarID();

    while (!funciones.adopcionNoExiste(fichaID)) {
        fichaID = funciones.generarID();
    }

    fichaAdopcion.fecha = new Date();

    fichaAdopcion.id = fichaID;
    fichaAdopcion.estado = "Dar en Adopción";
    fichaAdopcion.rutusuario = req.user.rut;
    fichaAdopcion.rutvet = null;
    Adopcion.create(fichaAdopcion).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    });
    res.redirect('/profile')
}

exports.verMascotasEnAdopcion = async(req, res) => {
    Adopcion.findAll({ where: { estado: 'Dar en Adopcion' } }).then(data => {
        res.render('vistaAdoptar', { adopciones: data })
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })
}

exports.adoptarMascota = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        fechaInicio,
        rutvet,
        rutusuario,
        idmascota
    } = req.body;
    var fichaID = funciones.generarID();

    while (!funciones.adopcionNoExiste(fichaID)) {
        fichaID = funciones.generarID();
    }
    fichaAdopcion.id = fichaID;

    fichaAdopcion.fecha = new Date();

    fichaAdopcion.estado = "Adoptar";
    let obs = req.user.rut + ": " + fichaAdopcion.observacion;
    fichaAdopcion.observacion = obs;
    fichaAdopcion.rutvet = null;

    Adopcion.create(fichaAdopcion).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear fichaAdopcion.")
    });
    res.redirect('/profile');
}