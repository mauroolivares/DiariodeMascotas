const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const Usuario = require('../models/user.model');
const Administrador = require('../models/user_admin.model');
const Veterinario = require('../models/user_vet.model');
const Institucion = require('../models/user_instit.model');
const Dueno = require('../models/user_dueno.model')

passport.use(
    new LocalStrategy({
        usernameField: "rut",
        passwordField: "password"
    }, async(rut, password, done) => {
        try {
            const usuario = await Usuario.findByPk(rut);

            if (!usuario) {
                return done(null, false, { message: "RUT no encontrado" })
            }
            const isMatch = await bcrypt.compare(password, usuario.password)
            if (isMatch) {
                return done(null, usuario)
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
        } catch (err) {
            done(err);
        }
    }));

passport.serializeUser(function(user, done) {
    console.log("serial")
    done(null, user)
});

passport.deserializeUser(
    function(user, done) {
        Usuario.findByPk(user.rut)
            .then(data => {
                const esAdmin = Administrador.findByPk(user.rut);
                const esInsti = Institucion.findByPk(user.rut);
                const esVet = Veterinario.findByPk(user.rut);
                const esDueno = Dueno.findByPk(user.rut);
                Promise.all([esAdmin, esInsti, esVet, esDueno]).then(data2 => {
                    if (data2[0] != null) {
                        user.tipo = "Administrador";
                    }
                    if (data2[1] != null) {
                        user.tipo = "Institucion";
                        user.area = data2[1].dataValues.area;
                        user.totalfunc = data2[1].dataValues.totalfunc;
                        user.totalpuestos = data2[1].dataValues.totalpuestos;

                    }
                    if (data2[2] != null) {
                        user.tipo = "Veterinario";
                        user.especialidad = data2[2].dataValues.especialidad;
                        user.rutinstitucion = data2[2].dataValues.rutinstitucion;
                    }
                    if (data2[3] != null) {
                        user.tipo = "Dueno";
                        user.estado = data2[3].dataValues.estado;
                    }
                    done(null, user);
                });
            }).catch(err => {
                return done(null, null)
            });
    });