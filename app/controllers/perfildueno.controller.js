const mascctrl = require('./mascota.controller');
const contctrl = require('./controlmedico.controller');
const userctrl = require('./usuario.controller');
const adopctrl = require('./fichaadopcion.controller');
const auth = require('./auth.controller');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.verificar = (req, res, next) => {
    if (auth.isAuthenticated(req.user, "Dueno")) {
        next();
    } else {
        res.redirect("/")
    }
}

//Perfil del Dueño:
exports.Menu = (req, res) => {
    res.render('perfilDueño', { dueno: req.user })
}

//POST: Editar datos de dueño en sesión:
exports.editarDatosDueno = async(req, res) => {
    const usuario = { rut, correo, password, nombrecompleto, descripcion, ubicacion,
        telefono, direccion, fechanacimiento, estado} = req.body;

    const usuarioedit = await userctrl.editarUsuario(usuario);
    const duenoedit = await userctrl.editarDueno(usuario);
    Promise.all([usuarioedit, duenoedit]).then(data => {
        res.redirect("/logout");
    });
}

//Ver mascotas de dueño:
exports.verMascotas = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    res.render('mascotas', { mascotas: mascotas, usuario: req.user });
}

//Ver controles de mascotas del dueño:
exports.verControles = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    const controles = await contctrl.listaControles(req.user);
    res.render('controles', { controles: controles, mascotas: mascotas, usuario: req.user })
}

//Ver las mascotas en adopción y fichas del usuario:
exports.verMascotasEnAdopcion = async(req, res) => {
    const adopciones = await adopctrl.listaFichasAdopcion();
    const institInfo = await userctrl.listaInstituciones();
    res.render('vistaAdoptar', { adopciones: adopciones, instit: institInfo, usuario: req.user })
}

//POST: Añadir mascota de dueño a la plataforma:
exports.addMascota = async(req, res) => {
    const mascota = { id, nombre, fechanacimiento, especie, razacolor, sexo, 
        esterilizado, tienechip, desparasitado, estado, descripcion, rutusuario} = req.body;
    Promise.all([mascctrl.comprobarAgregarMascota(mascota, req.user.rut)]).then(data => {
        res.redirect('/profile/pets');
    });
}

//POST: Editar mascota de dueño seleccionada:
exports.editMascota = async(req, res) => {
    const mascota = { id, nombre, fechanacimiento, especie, razacolor, sexo,
        esterilizado, tienechip, desparasitado, estado, descripcion} = req.body;
    Promise.all([mascctrl.editarMascota(mascota)]).then(data => {
        res.redirect('/profile/pets');
    });
}

//POST: Añadir control médico de una mascota a la plataforma:
exports.addControl = async(req, res) => {
    const control = {fecha, peso, temperatura, vacuna, 
        estado, observacion, idmascota} = req.body;
    Promise.all([contctrl.comprobarAgregarControl(control, req.user)]).then(data => {
        res.redirect('/profile/controls');
    });
}

//POST: Editar control médico seleccionado:
exports.editControl = async(req, res) => {
    const control = { id, fecha, peso, temperatura,
        vacuna, estado, observacion, idmascota} = req.body
    Promise.all([contctrl.editarControl(control)]).then(data => {
        res.redirect('/profile/controls');
    });
}

//POST: Hacer una solicitud para adoptar una mascota listada:
exports.adoptarMascota = async(req, res) => {
    const fichaAdopcion = { id, observacion,} = req.body;
    fichaAdopcion.estado = "Solicitada";
    fichaAdopcion.rutusuario = req.user.rut;
    Promise.all([adopctrl.editarAdopcion(fichaAdopcion)]).then(data => {
        res.redirect('/profile/adopcion');
    });
}