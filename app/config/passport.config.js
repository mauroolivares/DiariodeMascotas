const passport = require('passport')
const bcrypt = require('bcrypt');
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

serialize = (user, done) => {
    done(null, user.id);
}

deserialize = (id, done) => {
    Usuario.findByPk(rut)
        .then(data => {
            done(null, data);
        })
        .catch(err => {
            return done(null, null)
        });

}

passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
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
            const isMatch = await usuario.isValidPassword(password);

            /*
                    bcrypt.compare(password, data.password, (err, same) => {
                            if (err) {
                                return done(err)
                            }
                            if (same) {
                                return done(null, data)
                            } else {
                                return done(null, false, { message: "Contraseña Incorrecta." })
                            }
                        });
                    } catch {
                        return done(null, false)
                    }
                } else {
                    return done(null, false, { message: "Usuario no encontrado." })
                }
            })
            .catch(err => {
                return done(err)
            });

        } catch (err){
            done(error)
        }
        */
        } catch (err) {

        }
    }));



/*
locallogin = (rut, password, done) => {
    //if rut pwd true
    if (true) {
        return done(null, { rut: rut, password: password })
    }
    done(null, false);
}


module.exports = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({ message: "Unauthorized Access - No Token Provided!" });

        req.user = user;

        next();

    })(req, res, next);
};
*/