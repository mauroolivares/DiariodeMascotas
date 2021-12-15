const instit = require('../controllers/instit.controller')
var router = require("express").Router();

router.get("/instit", instit.institMenu);
router.post("/instit/editUser", instit.editarDatosInstit);
//router.get("/instit/vets", instit.instiVetsMenu);
router.get("/instit/pets", instit.institPetsMenu);
router.get("/instit/adopt", instit.AdopcionMenu);
module.exports = router;