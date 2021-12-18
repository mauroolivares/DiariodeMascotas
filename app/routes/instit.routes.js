const instit = require('../controllers/perfilinstit.controller')
var router = require("express").Router();

router.get("/instit", instit.institMenu);
router.post("/instit/editUser", instit.editarDatosInstit);
//router.get("/instit/vets", instit.instiVetsMenu);
module.exports = router;