const admin = require('../controllers/perfiladmin.controller')
var router = require("express").Router();

//añadir "admin.verificar" para pruebas iniciando sesion correctamente

router.get("/admin", admin.verificar, admin.Menu);
router.post("/admin/saveUser", admin.verificar, admin.AgregarUsuario);
router.post("/admin/editUser", admin.verificar, admin.EditarUsuario);
router.post("/signin", admin.AgregarUsuario);

module.exports = router;