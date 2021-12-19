const admin = require('../controllers/perfiladmin.controller')
var router = require("express").Router();

//añadir "admin.isAuthenticated" para pruebas sin necesidad de iniciar sesion

router.get("/admin", admin.isAuthenticated, admin.Menu);
router.post("/admin/saveUser", admin.isAuthenticated, admin.AgregarUsuario);
router.post("/admin/editUser", admin.isAuthenticated, admin.EditarUsuario);

module.exports = router;