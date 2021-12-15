const Institucion = require('../models/user_instit.model');
const Veterinario = require('../models/user_vet.model');
const Usuario = require('../models/user.model');

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
    console.log(req.user)
    res.render('perfilInstitucion', { instit: req.user });
}

exports.editarDatosInstit = async(req, res) => {
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
        area,
        totalfunc,
        totalpuestos
    } = req.body;
    Usuario.update(usuario, { where: { rut: req.user.rut } }).then(data1 => {
        Institucion.update(usuario, { where: { rut: req.user.rut } }).then(data2 => {
            console.log("Institución y Usuario Actualizado.")
            res.redirect("/logout");
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

//Menu de Veterinarios de una Institucion:
/*
exports.instiVetsMenu = async(req, res) => {
    if (req.user == undefined) {
        Veterinario.findAll({ where: { rutinstitucion: '555' } }).then(data => {
            console.log(data);
            res.render('mascotasDueño', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        });
    } else {
        Veterinario.findAll({ where: { rutinstitucion: req.user.rut } }).then(data => {
            console.log(data);
            res.render('mascotasDueño', { mascotas: data })
        }).catch(err => {
            console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
        })
        res.render('admin');
    }
}
*/
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

exports.AdopcionMenu = async(req, res) => {
    res.render('adopcionInstitucion')
}