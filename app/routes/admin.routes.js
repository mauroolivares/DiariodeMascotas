const admin = require('../controllers/perfiladmin.controller')
const user = require('../controllers/usuario.controller')
var router = require("express").Router();

//añadir "admin.isAuthenticated" para pruebas sin necesidad de iniciar sesion

router.get("/admin", admin.Menu);
router.post("/admin/saveUser", admin.AgregarUsuario);
router.post("/admin/editUser", admin.EditarUsuario);

module.exports = router;