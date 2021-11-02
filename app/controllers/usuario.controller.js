const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_owner.model')

// Registra un Usuario
exports.saveUser = async(req, res) => {
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
};


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

exports.loggedin = (req, res) => {

}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const rut = req.body.rut;

    Usuario.findByPk(rut)
        .then(data => {
            if (data) {
                res.send(data);
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
};

exports.loginpage = (req, res) => {
    res.render('login');
}

exports.signpage = (req, res) => {
    res.render('register');
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};