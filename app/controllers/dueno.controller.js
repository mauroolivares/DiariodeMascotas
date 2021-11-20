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
exports.duenoMenu = async(req, res) => {
    //send datos de req.user
    res.render('perfilUsuario')
}

//Mascotas de dueño:
exports.duenoMascotaMenu = async(req, res) => {
    //findallmascotas del usuario
    res.render('mascotasUsuario')
}

exports.duenoMascotaPerfil = async(req, res) => {
    //send query con los datos de la mascota
    res.render('perfilMascota')
}