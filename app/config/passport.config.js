const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

isAuth = () => {
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/');
        }
    }
}

const Usuario = require('../models/user.model');

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
                return done(null, false, { message: 'Contraseñaincorrecta' })
            }
        } catch (err) {
            done(err);
        }
    }));

passport.serializeUser(function(user, done) {
    done(null, user)
})
passport.deserializeUser(
    function(user, done) {
        Usuario.findByPk(user.rut)
            .then(data => {
                done(null, user);
            })
            .catch(err => {
                return done(null, null)
            });

    });