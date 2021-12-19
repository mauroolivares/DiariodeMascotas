const instit = require('../controllers/perfilinstit.controller')
var router = require("express").Router();

router.get("/instit", instit.isAuthenticated, instit.institMenu);
router.post("/instit/editUser", instit.isAuthenticated, instit.editarDatosInstit);
router.get("/instit/vets", instit.isAuthenticated, instit.instiVetsMenu);
module.exports = router;