const db = require("../models");
const bcrypt = require('bcrypt');

const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.saveUser = (req, res) => {
    if (!req.body.rut || req.body.rut < 8) {
        res.status(400).send({
            message: "No puede estar vacio."
        });
        return;
    }

    async
    const usuario = {
        rut: req.body.rut,
        correo: req.body.correo,
        password: await bcrypt.hash(req.body.password, 10),
        nombrecompleto: req.body.nombrecompleto
    };

    Usuario.create(usuario).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error intentando crear usuario."
        });
    });
};

exports.authenticateUserWithemail = (usuario) => {
    return new Promise((resolve, reject) => {
        try {
            usermodel.findOne({
                where: {
                    user_email: user.userName // user email
                }
            }).then(async(response) => {
                if (!response) {
                    resolve(false);
                } else {
                    if (!response.dataValues.password ||
                        !await response.validPassword(user.password,
                            response.dataValues.password)) {
                        resolve(false);
                    } else {
                        resolve(response.dataValues)
                    }
                }
            })
        } catch (error) {
            const response = {
                status: 500,
                data: {},
                error: {
                    message: "user match failed"
                }
            };
            reject(response);
        }
    })
}


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const rut = req.params.rut;

    Usuario.findByPk(rut)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
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

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};