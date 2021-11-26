const Mascota = require('../models/form_pet.model');
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

exports.MascotaPerfil = async(req, res) => {
    //send query con los datos de la mascota
    res.render('perfilMascota')
}