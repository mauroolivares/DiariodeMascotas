const auth = require("../controllers/auth.controller");
const user = require("../controllers/usuario.controller");
const passport = require('passport')
var router = require("express").Router();

router.get("/", auth.loginpage);
router.get("/loggedin", auth.login);
router.get("/signin", auth.signpage);
router.get("/logout", auth.logout);

router.post("/loggedin", passport.authenticate('local', {
    failureRedirect: "/",
    successRedirect: "/loggedin"
}));
router.post("/signin", user.comprobarAgregarUsuario);

router.get('*', (req, res) => {
    res.render('rutaNoEncontrada');
});


module.exports = router;