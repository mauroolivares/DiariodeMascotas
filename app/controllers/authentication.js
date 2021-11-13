//Muestra de autenticación como Admin | Institución | Veterinario | Dueño para exportar en el inicio de sesión.
const bcrypt = require('bcrypt');

/*
const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        console.log("provide a token");
        res.redirect("/")
    } else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) {
                console.log("failed to autenticate");
                res.redirect("/")
            }
            req.user = value.data
            next()
        })
    }
}

exports.generateToken = (usuario) => {
    return jwt.sign({ data: usuario }, tokenSecret, { expiresIn: '24h' })
}
*/