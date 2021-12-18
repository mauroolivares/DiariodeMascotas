const Adopcion = require('../models/form_adoptform.model')

const funciones = require('./functions.controller');
const userctrl = require('./usuario.controller');
const mascctrl = require('./mascota.controller');
const contctrl = require('./controlmedico.controller');
const adopctrl = require('./fichaadopcion.controller');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("Inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Veterinario") {
            //pagina tipo "404"
            console.log("No eres Veterinario")
            res.redirect("/")
        } else {
            next()
        }
    }
}

exports.Menu = async(req, res) => {
    const insti = await userctrl.listaInstituciones();
    res.render('perfilVeterinario', { veterinario: req.user, instituciones: insti })
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
    const usuarioedit = await userctrl.editarUsuario(usuario);
    const vetedit = await userctrl.editarVeterinario(usuario);
    Promise.all([usuarioedit, vetedit]).then(data => {
        console.log("Veterinario y Usuario Actualizado.")
        res.redirect("/logout");
    });
}

exports.verMascotas = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    res.render('mascotas', { mascotas: mascotas, usuario: req.user });
}

exports.verControles = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    const controles = await contctrl.listaControles(req.user);
    res.render('controles', { controles: controles, mascotas: mascotas, usuario: req.user })
}

exports.verFichasAdopcion = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user.rutinstitucion);
    const adopcion = await adopctrl.listaFichasAdopcion();
    res.render('adopcionInstitucion', { adopciones: adopcion, mascotas: mascotas, usuario: req.user });
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
        descripcion,
        rutusuario
    } = req.body;
    Promise.all([mascctrl.comprobarAgregarMascota(mascota, req.user.rutinstitucion)]).then(data => {
        res.redirect('/vet/pets');
    });
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
    Promise.all([mascctrl.editarMascota(mascota)]).then(data => {
        res.redirect('/vet/pets');
    });
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
    Promise.all([contctrl.comprobarAgregarControl(control, req.user)]).then(data => {
        res.redirect('/vet/controls');
    });
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
    Promise.all([contctrl.editarControl(control)]).then(data => {
        res.redirect('/vet/controls');
    });
}

exports.ponerEnAdopcion = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        fecha,
        idmascota
    } = req.body;

    Promise.all([adopctrl.comprobarAgregarFicha(fichaAdopcion)]).then(data => {
        res.redirect('/vet/adopcion');
    });
}

//Esto es para cuando se acepta o rechaza la solicitud de adoptar de un dueño:
exports.responderSolicitud = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        estado,
        fechaInicio,
        rutvet,
        rutusuario,
        idmascota
    } = req.body;

    Promise.all([adopctrl.editarAdopcion(fichaAdopcion)]).then(data => {
        if (fichaAdopcion.estado == "Aceptado") {
            let mascota = {
                id: fichaAdopcion.idmascota,
                rutusuario: fichaAdopcion.rutusuario
            }
            Promise.all([mascctrl.editarMascota(mascota)]).then(data2 => {
                res.redirect('/vet/adopcion');
            });
        }

    });
}