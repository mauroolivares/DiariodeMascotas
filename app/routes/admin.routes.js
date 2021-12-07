const admin = require('../controllers/admin.controller')
const user = require('../controllers/usuario.controller')
var router = require("express").Router();

//añadir "admin.isAuthenticated" para pruebas sin necesidad de iniciar sesion

router.get("/admin", admin.Menu);
router.post("/admin/saveUser", user.saveUser);
router.post("/admin/editUser", user.EditUser, admin.Menu);

module.exports = router;