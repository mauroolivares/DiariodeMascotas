const user = require("../controllers/usuario.controller.js");
const passport = require('passport')
var router = require("express").Router();

router.get("/", user.loginpage);
router.get("/admin", user.adminMenu);
router.get("/admin/register", user.adminAddUserMenu);
router.get("/admin/editUser", user.adminEditUserMenu)
router.post("admin/edited", user.editUser);

router.get("/instit", user.institMenu);
router.get("/instit/vets", user.instiVetsMenu);
router.get("/instit/pets", user.institPetsMenu);

router.get("/profile", user.duenoMenu);
router.get("/profile/pets", user.duenoMascotaMenu);
router.get("/profile/pets/pf", user.duenoMascotaPerfil);

router.post("/loggedin", passport.authenticate('local', {
    failureRedirect: "/"
}), user.login);
router.post("/signin", user.saveUser);
router.get("/signin", user.signpage);

module.exports = router;