const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_owner.model')

//Sitio para iniciar sesion:
exports.loginpage = (req, res) => {
    res.render('login');
}

//Sitio para registrar usuario fuera de sesión:
exports.signpage = (req, res) => {
    res.render('register');
}

//Funcion para autenticar el inicio de sesión:
exports.authenticateUserWithemail = async(req, res) => {
    const rut = req.body.rut;
    Usuario.findByPk(rut)
        .then(data => {
            if (data) {
                console.log(data);
                try {

                    bcrypt.compare(req.body.password, data.password, (err, same) => {
                        if (err) {
                            console.log(err);
                            res.redirect('/')
                        }
                        if (same) {
                            //insertar querys de distintos tipos de usuario
                            console.log("logeado");
                            res.send(data);
                        } else {
                            console.log("Contraseña incorrecta");
                            res.redirect('/');
                        }
                    });
                } catch {
                    res.status(500).send();
                }
                //res.send(data);
            } else {
                console.log(req.body)
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${rut}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + rut
            });
        });
}

//Menu de admin:
exports.adminMenu = (req, res) => {
    res.render('admin');
}

//Menu de añadir usuario:
exports.adminAddUserMenu = (req, res) => {
    res.render('register');
}

//Menu de editar usuario:
exports.adminEditUserMenu = (req, res) => {

}

//Menu de institucion:
exports.institMenu = (req, res) => {

}

// Registra un Usuario
exports.saveUser = async(req, res) => {
    //If 
    if (!req.body.rut || req.body.rut < 8) {
        res.status(400).send({
            message: "No puede estar vacio."
        });
        return;
    }

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

//Menu de Veterinarios de una Institucion:
exports.instiVetsMenu = async(req, res) => {

}

//Menu de Mascotas de una Institucion:
exports.institPetsMenu = async(req, res) => {

}

//Añadir/eliminar veterinario a una institución
exports.updateVet = async(req, res) => {
    const vet = {
        rutinstitucion = req.body.rutinstitucion
    }

    Veterinario.update(vet, { where: { rut: req.body.rut } });
    //res.redirect("/instit");
}

//Menu de dueño:
exports.duenoMenu = async(req, res) => {

}

//Mascotas de dueño:
exports.duenoMascotaMenu = async(req, res) => {

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
}