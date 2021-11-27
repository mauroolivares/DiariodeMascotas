const dueno = require('../controllers/dueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.Menu);
router.get("/profile/pets", dueno.MascotaMenu);
router.get("/profile/pets", dueno.MascotaMenu);
router.get("/profile/pets/pf", dueno.MascotaPerfil);
router.post("/add-new-mascota", dueno.addMascota);
router.post("/editar-mascota-usuario", dueno.editMascota);
module.exports = router;