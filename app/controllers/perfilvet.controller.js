const logger = require('../config/logging.config');
const userctrl = require('./usuario.controller');
const mascctrl = require('./mascota.controller');
const contctrl = require('./controlmedico.controller');
const adopctrl = require('./fichaadopcion.controller');
const auth = require('./auth.controller');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.verificar = (req, res, next) => {
    if (auth.isAuthenticated(req.user, "Veterinario")) {
        next();
    } else {
        res.redirect("/")
    }
}

//Perfil del veterinario:
exports.Menu = async(req, res) => {
    const insti = await userctrl.listaInstituciones();
    res.render('perfilVeterinario', { veterinario: req.user, instituciones: insti })
}

//POST: Editar datos del Veterinario en sesión:
exports.editarDatosVet = async(req, res) => {
    const usuario = { rut, correo, password, nombrecompleto, descripcion, ubicacion,
        telefono, direccion, fechanacimiento, especialidad, rutinstitucion} = req.body;
    const usuarioedit = await userctrl.editarUsuario(usuario);
    const vetedit = await userctrl.editarVeterinario(usuario);
    Promise.all([usuarioedit, vetedit]).then(data => {
        res.redirect("/logout");
    });
}

//Ver mascotas de la institución asociada:
exports.verMascotas = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    res.render('mascotas', { mascotas: mascotas, usuario: req.user });
}

//Ver controles de las mascotas de la institución asociada:
exports.verControles = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    const controles = await contctrl.listaControles(req.user);
    res.render('controles', { controles: controles, mascotas: mascotas, usuario: req.user })
}

//Ver fichas de adopción, su estado y solicitudes realizadas:
exports.verFichasAdopcion = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    const adopcion = await adopctrl.listaFichasAdopcion();
    res.render('adopcionVeterinario', { adopciones: adopcion, mascotas: mascotas, usuario: req.user });
}

//POST: Añadir una mascota a la institución asociada al veterinario en la plataforma:
exports.addMascota = async(req, res) => {
    const mascota = { id, nombre, fechanacimiento, especie, razacolor, sexo, esterilizado,
        tienechip, desparasitado, estado, descripcion, rutusuario} = req.body;
    Promise.all([mascctrl.comprobarAgregarMascota(mascota, req.user.rutinstitucion)]).then(data => {
        res.redirect('/vet/pets');
    });
}

//POST: Editar una mascota seleccionada:
exports.editMascota = async(req, res) => {
    const mascota = { id, nombre, fechanacimiento, especie, razacolor, sexo,
        esterilizado, tienechip, desparasitado, estado, descripcion} = req.body;
    Promise.all([mascctrl.editarMascota(mascota)]).then(data => {
        res.redirect('/vet/pets');
    });
}

//POST: Añadir un control médico a la institución asociada al veterinario en la plataforma:
exports.addControl = async(req, res) => {
    const control = { fecha, peso, temperatura, vacuna, estado, observacion, idmascota } = req.body
    Promise.all([contctrl.comprobarAgregarControl(control, req.user)]).then(data => {
        res.redirect('/vet/controls');
    });
}

//POST: Editar un control médico seleccionado:
exports.editControl = async(req, res) => {
    const control = { id, fecha, peso, temperatura, vacuna, estado, observacion, idmascota} = req.body;
    Promise.all([contctrl.editarControl(control)]).then(data => {
        res.redirect('/vet/controls');
    });
}

//POST: Poner en adopción una mascota de la institución asociada, para que dueños de mascotas puedan adoptarla:
exports.ponerEnAdopcion = async(req, res) => {
    const fichaAdopcion = { observacion, idmascota } = req.body;
    Promise.all([adopctrl.comprobarAgregarFicha(fichaAdopcion, req.user)]).then(data => {
        res.redirect('/vet/adopcion');
    });
}

//POST: Responder a una solicitud de adopción del dueño interesado en adoptar:
exports.responderSolicitud = async(req, res) => {
    const fichaAdopcion = { id, observacion, estado, idmascota, rutusuario} = req.body;
    Promise.all([adopctrl.editarAdopcion(fichaAdopcion)]).then(data => {
        if (fichaAdopcion.estado == "Aprobada") {
            let mascota = { id: fichaAdopcion.idmascota, rutusuario: fichaAdopcion.rutusuario }
            Promise.all([mascctrl.editarMascota(mascota)]).then(data2 => {
                Promise.all([contctrl.editarControlesMascotas(mascota.id, mascota.rutusuario)]).then(data3 => {
                    res.redirect('/vet/adopcion');
                });
            });
        } else { res.redirect('/vet/adopcion');}
    })
}