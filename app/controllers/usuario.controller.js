const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_dueno.model')
const funciones = require('../controllers/functions.controller');

//const auth = require('../controllers/authentication')

//Sitio para iniciar sesion:
exports.loginpage = (req, res) => {
    req.logout();
    res.render('paginaPrincipal');
}

//Sitio para registrar usuario fuera de sesión:
exports.signpage = (req, res) => {
    res.render('register');
}

//Función para cerrar sesion:
exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}

//Funcion para redirigir inicio de sesión:
exports.login = async(req, res) => {
    switch (req.user.tipo) {
        case "Administrador":
            res.redirect("/admin")
            break;

        case "Institucion":
            res.redirect("/instit")
            break;

        case "Veterinario":
            res.redirect("/vet")
            break;

        case "Dueno":
            res.redirect("/profile")
            break;
    }
    res.end()
}

exports.EditUser = (req, res, next) => {
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
    Usuario.update(usuario, { where: { rut: req.body.rut } }).then(data => {
        res.redirect("/admin")
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
}

// Registra un Usuario como admin:
exports.saveUser = async(req, res) => {
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
        estado
    } = req.body;
    usuario.password = await bcrypt.hash(req.body.password, 10)
    Usuario.create(usuario).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    console.log(usuario);
    //token = auth.generateToken(usuario);

    switch (req.body.tipo) {
        case "Administrador":
            Administrador.create(usuario).then(data => {
                console.log(data);
                res.send(usuario);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });

            break;


        case "Institucion":

            Institucion.create(usuario).then(data => {
                console.log(data);
                res.send(usuario);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            break;

        case "Veterinario":
            usuario.rutinstitucion = null
            Veterinario.create(usuario).then(data => {
                console.log(data);
                res.send(usuario);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            console.log(usuario);
            break;

        case "Dueño":
            Dueno.create(usuario).then(data => {
                console.log(data);
                res.send(usuario);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            break;
    };
}