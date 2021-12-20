const instit = require('../controllers/perfilinstit.controller')
var router = require("express").Router();

router.get("/instit", instit.verificar, instit.institMenu);
router.post("/instit/editUser", instit.verificar, instit.editarDatosInstit);
router.get("/instit/vets", instit.verificar, instit.instiVetsMenu);
module.exports = router;