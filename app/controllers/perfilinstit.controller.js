const userctrl = require('./usuario.controller');
const auth = require('./auth.controller');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.verificar = (req, res, next) => {
    if (auth.isAuthenticated(req.user, "Institucion")) {
        next();
    } else {
        res.redirect("/")
    }
}

//Perfil de la institucion:
exports.institMenu = (req, res) => {
    res.render('perfilInstitucion', { instit: req.user });
}

//POST: Editar datos de la Institución en sesión:
exports.editarDatosInstit = async(req, res) => {
    const usuario = { rut, correo, password, nombrecompleto, descripcion, ubicacion,
        telefono, direccion, fechanacimiento, area, totalfunc,totalpuestos} = req.body;
    const usuarioedit = await userctrl.editarUsuario(usuario);
    const instiedit = await userctrl.editarInstitucion(usuario);
    Promise.all([usuarioedit, instiedit]).then(data => {
        res.redirect("/logout");
    });
}

//Menu de Veterinarios de una Institucion:
exports.instiVetsMenu = async(req, res) => {
    const vets = await userctrl.listaVeterinarios(req.user.rut);
    res.render('veterinariosInstitucion', { veterinarios: vets, usuario: req.user });
}