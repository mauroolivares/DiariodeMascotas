const mascctrl = require('./mascota.controller');
const contctrl = require('./controlmedico.controller');
const userctrl = require('./usuario.controller');
const adopctrl = require('./fichaadopcion.controller');


//Autenticacion
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("Inicia Sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Dueno") {
            //pagina tipo "404"
            console.log("No eres dueño")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de dueño:
exports.Menu = (req, res) => {
    res.render('perfilDueño', { dueno: req.user })
}

exports.editarDatosDueno = async(req, res) => {
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

    const usuarioedit = await userctrl.editarUsuario(usuario);
    const duenoedit = await userctrl.editarDueno(usuario);
    Promise.all([usuarioedit, duenoedit]).then(data => {
        console.log("Dueño y Usuario Actualizado.")
        res.redirect("/logout");
    });
}

//Mascotas de dueño:
exports.verMascotas = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    res.render('mascotas', { mascotas: mascotas, usuario: req.user });
}

exports.verControles = async(req, res) => {
    const mascotas = await mascctrl.listaMascotas(req.user);
    const controles = await contctrl.listaControles(req.user);
    res.render('controles', { controles: controles, mascotas: mascotas, usuario: req.user })
}

exports.verMascotasEnAdopcion = async(req, res) => {
    const adopciones = await adopctrl.listaFichasAdopcion();
    const institInfo = await userctrl.listaInstituciones();
    res.render('vistaAdoptar', { adopciones: adopciones, instit: institInfo, usuario: req.user })
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
    Promise.all([mascctrl.comprobarAgregarMascota(mascota, req.user.rut)]).then(data => {
        res.redirect('/profile/pets');
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
        res.redirect('/profile/pets');
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
    Promise.all([contctrl.comprobarAgregarControl(control, req.user)]).then(data => {
        res.redirect('/profile/controls');
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
    } = req.body
    Promise.all([contctrl.editarControl(control)]).then(data => {
        res.redirect('/profile/controls');
    });
}

exports.adoptarMascota = async(req, res) => {
    const fichaAdopcion = {
        id,
        observacion,
        fechaInicio,
        rutvet,
        idmascota
    } = req.body;
    fichaAdopcion.estado = "Solicitada";
    //Añadirle a la observación, la anterior + la actual del usuario.
    fichaAdopcion.rutusuario = req.user.rut;
    Promise.all([adopctrl.editarAdopcion(fichaAdopcion)]).then(data => {
        res.redirect('/profile/adopcion');
    });

    res.redirect('/profile');
}