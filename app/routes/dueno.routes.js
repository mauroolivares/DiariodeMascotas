const dueno = require('../controllers/dueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.duenoMenu);
router.get("/profile/pets", dueno.duenoMascotaMenu);
router.get("/profile/pets/pf", dueno.duenoMascotaPerfil);
module.exports = router;