const user = require("../controllers/usuario.controller.js");
const passport = require('passport')
var router = require("express").Router();

router.get("/", user.loginpage);
router.get("/loggedin", user.login);
router.get("/signin", user.signpage);
router.get("/logout", user.logout);

router.post("/loggedin", passport.authenticate('local', {
    failureRedirect: "/",
    successRedirect: "/loggedin"
}));

router.post("/signin", user.saveUser);


module.exports = router;