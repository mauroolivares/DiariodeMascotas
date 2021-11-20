const admin = require('../controllers/admin.controller')
var router = require("express").Router();

//añadir "admin.isAuthenticated" para pruebas sin necesidad de iniciar sesion

router.get("/admin", admin.Menu);
router.get("/admin/register", admin.AddUserMenu);
router.post("/admin/register", admin.saveUser);
router.get("/admin/editUser", admin.EditUserMenu)
router.post("admin/edited", admin.EditUser);

module.exports = router;