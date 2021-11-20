const Veterinario = require('../models/user_vet.model');

exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Institución") {
            //pagina tipo "404"
            console.log("no eres institucion")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de institucion:
exports.institMenu = (req, res) => {
    res.render('admin');
}

//Menu de Veterinarios de una Institucion:
exports.instiVetsMenu = async(req, res) => {
    res.render('admin');
}

//Menu de Mascotas de una Institucion:
exports.institPetsMenu = async(req, res) => {
    res.render('admin');
}

//Añadir veterinario a una institución
exports.AddVetInst = async(req, res) => {
    const vet = {
        rutinstitucion: req.user.rut
    }
    Veterinario.update(vet, { where: { rut: req.body.rut } }).then(data => {
        console.log("Veterinario agregado la institución!")
        res.redirect("/instit/vets");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

//Desligar veterinario de una institución
exports.DropVetInst = async(req, res) => {
    const vet = {
        rutinstitucion: null
    }
    Veterinario.update(vet, { where: { rut: req.body.rut } }).then(data => {
        console.log("Veterinario desligado de la institución")
        res.redirect("/instit/vets");
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}