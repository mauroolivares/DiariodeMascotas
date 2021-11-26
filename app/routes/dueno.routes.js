const dueno = require('../controllers/dueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.Menu);
router.get("/profile/pets", dueno.MascotaMenu);
router.get("/profile/pets/pf", dueno.MascotaPerfil);
module.exports = router;