const userctrl = require('./usuario.controller');
const logger = require('../config/logging.config');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("Inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Administrador") {
            //pagina tipo "404"
            console.log("No eres administrador")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de admin:
exports.Menu = async(req, res) => {
    const usuarios = await userctrl.listaUsuarios();
    res.render('perfilAdmin', { usuarios: usuarios, admin: req.user })
}

exports.AgregarUsuario = async(req, res) => {
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
        totalfunc,
        totalpuestos,
        area,
        especialidad,
        estado
    } = req.body;
    console.log(usuario);
    Promise.all([userctrl.comprobarAgregarUsuario(usuario)]).then(data => {
        res.redirect('/admin');
    });

};

exports.EditarUsuario = async(req, res) => {
    const usuario = {
        rut,
        correo,
        password,
        nombrecompleto,
        descripcion,
        ubicacion,
        telefono,
        direccion,
        fechanacimiento
    } = req.body;
    Promise.all([userctrl.editarUsuario(usuario)]).then(data => {
        res.redirect('/admin');
    });
}