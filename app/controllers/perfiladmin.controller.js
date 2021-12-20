const userctrl = require('./usuario.controller')
const auth = require('./auth.controller');
const logger = require('../config/logging.config');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.verificar = (req, res, next) => {
    if (auth.isAuthenticated(req.user, "Administrador")) {
        next();
    } else {
        res.redirect("/")
    }
}
//Menu de Administrador
exports.Menu = async(req, res) => {
    const usuarios = await userctrl.listaUsuarios();
    res.render('perfilAdmin', { usuarios: usuarios, admin: req.user })
}

//Agregar un usuario en la lista general de usuarios
exports.AgregarUsuario = async(req, res) => {
    const usuario = { rut, correo, password, nombrecompleto, descripcion, ubicacion, telefono, direccion, 
        fechanacimiento, totalfunc, totalpuestos, area, especialidad, estado} = req.body;
    Promise.all([userctrl.comprobarAgregarUsuario(usuario)]).then(data => {
        res.redirect('/admin');
    });

};

//Editar datos de un usuario listado
exports.EditarUsuario = async(req, res) => {
    const usuario = { rut, correo, password, nombrecompleto, descripcion,
        ubicacion, telefono, direccion, fechanacimiento} = req.body;
    Promise.all([userctrl.editarUsuario(usuario)]).then(data => {
        res.redirect('/admin');
    });
}