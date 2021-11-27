const Mascota = require('../models/form_pet.model')
const Adopcion = require('../models/form_adoptform.model')
const Institucion = require('../models/user_instit.model')
const funciones = require('../controllers/functions.controller')
const { Op } = require("sequelize");

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
    res.render('perfilVeterinario');
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
    mascota.rutusuario = req.user.rutinstitucion;
    Mascota.create(mascota).then(data => {
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

exports.postularInstitucion = (req, res) => {
    Institucion.findAll({
            where: {
                totalfunc: {
                    [Op.lt]: totalpuestos
                }
            }
        })
        .then(data => {
            //res.render('ListaInstituciones', {instituciones: data})
        });
}