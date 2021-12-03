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
    res.render('login');
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
exports.login = (req, res) => {
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

// Registra un Usuario:
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
        fechanacimiento
    } = req.body;

    //placeholder: hay que conversar sobre las fechas!
    let fechaString = funciones.transformarFecha(usuario.fechanacimiento);

    usuario.fechanacimiento = fechaString
    usuario.telefono = parseInt(usuario.telefono)
    usuario.password = await bcrypt.hash(req.body.password, 10)

    Usuario.create(usuario).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    });
    console.log(usuario);
    //token = auth.generateToken(usuario);

    const tipo = "Dueno";

    switch (tipo) {
        case "Administrador":
            Administrador.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            res.redirect("/")
            break;


        case "Institucion":
            usuario.totalfunc = 180;
            usuario.totalpuestos = 100;
            usuario.area = "Fundación";
            console.log(usuario);

            Institucion.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            res.redirect("/")
            break;

        case "Veterinario":
            usuario.especialidad = "Uhhh si"
            usuario.rutinstitucion = null
            Veterinario.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            console.log(usuario);
            res.redirect("/")
            break;

        case "Dueno":
            usuario.estado = "X";
            Dueno.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            console.log(usuario);
            res.redirect("/")
            break;
    };
}

//Función de editar usuario:
exports.editUser = async(req, res) => {
    /*
    if (!req.body.rut || req.body.rut < 8) {
        res.status(400).send({
            message: "No puede estar vacio."
        });
        return;
    }
    */

    const usuario = {
        password: await bcrypt.hash(req.body.password, 10),
        nombrecompleto: req.body.nombrecompleto
    }

    Usuario.update(usuario, { where: { rut: req.body.rut } });

    switch (req.body.tipo) {
        case "Administrador":

            Administrador.update(usuario, { where: { rut: req.body.rut } });
            break;


        case "Institucion":
            //req.body.variablesinstitucion
            usuario.totalfunc = 180;
            usuario.totalpuestos = 100;
            usuario.area = "Fundación";
            console.log(usuario);

            Institucion.update(usuario, { where: { rut: req.body.rut } });
            break;

        case "Veterinario":
            //req.body.variablesvet
            usuario.especialidad = "Uhhh si"
            usuario.rutinstitucion = null
            Veterinario.update(usuario, { where: { rut: req.body.rut } });
            break;

        case "Dueño":
            //req.body.variablesdueño
            usuario.estado = "X";
            Dueno.update(usuario, { where: { rut: req.body.rut } });
            break;
    };
};