const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_dueno.model');

//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Administrador") {
            //pagina tipo "404"
            console.log("no eres administrador")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de admin:
exports.Menu = (req, res) => {
    Usuario.findAll().then(data => {
        res.render('admin', { usuarios: data })
    }).catch(err => {
        console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
    })

}

//Menu de añadir usuario:
exports.AddUserMenu = (req, res) => {
    res.render('register');
}

//Menu de editar usuario:
exports.EditUserMenu = (req, res) => {
    res.render('admin');
}

exports.EditUser = (req, res) => {
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
    Usuario.update(usuario, { where: { rut: req.body.rut } });

    switch (tipo) {
        case "Administrador":
            Administrador.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });

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
            break;

        case "Dueño":
            usuario.estado = "X";
            Dueno.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            console.log(usuario);
            res.send(usuario);
    };
}

// Registra un Usuario como admin:
exports.saveUser = async(req, res) => {
    const usuario = {
        rut: req.body.rut,
        password: await bcrypt.hash(req.body.password, 10),
        nombrecompleto: req.body.nombrecompleto
    };
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
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });

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
            break;

        case "Dueño":
            usuario.estado = "X";
            Dueno.create(usuario).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err.message || "Ha ocurrido un error intentando crear usuario.")
            });
            console.log(usuario);
            res.send(usuario);
    };
}