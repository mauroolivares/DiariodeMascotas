const Usuario = require('../models/user.model');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Administrador") {
            //pagina tipo "404"
            console.log("no eres administrador")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de admin:
exports.Menu = (req, res) => {
    Usuario.findAll().then(data => {
        res.render('perfilAdmin', { usuarios: data, admin: req.user })
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })

}