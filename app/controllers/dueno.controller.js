const Mascota = require('../models/form_pet.model');
const Usuario = require('../models/user.model');
const Dueno = require('../models/user_dueno.model');
const Control = require('../models/form_control.model');
const Adopcion = require('../models/form_adoptform.model');
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
exports.Menu = async(req, res) => {
    //send datos de req.user
    res.render('perfilUsuario', { dueno: req.user })
}

exports.editarDueno = async(req, res) => {
    //send datos de req.user
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
    Usuario.update(usuario, { where: { rut: req.body.rut } });
    Dueno.update(usuario, { where: { rut: req.body.rut } });
    res.redirect('/profile')
}

//Mascotas de dueño:
exports.MascotaMenu = async(req, res) => {
    if (req.user == undefined) {
        Mascota.findAll({ where: { rutusuario: '666' } }).then(data => {
            res.render('mascotasUsuario', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    } else {
        Mascota.findAll({ where: { rutusuario: req.user.rut } }).then(data => {
            res.render('mascotasUsuario', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
    }
}

exports.addMascota = async(req, res) => {
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
    mascota.rutusuario = req.user.rut;
    Mascota.create(mascota).then(data => {
        console.log(data);
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
    Control.update(control, { where: { id: control.id } }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    res.redirect('/profile/pets');
}



exports.MascotaPerfil = async(req, res) => {
    //send query con los datos de la mascota
    res.render('perfilMascota')
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
    /*
    Adopcion.findAll({ where: { estado: 'Dar en Adopcion' } }).then(data => {
        res.render('duenoEnAdopcion', { adopciones: data })
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })
    */
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
    //tendra el rut de la institucion
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