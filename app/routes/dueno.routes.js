const dueno = require('../controllers/perfildueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.Menu);
router.get("/profile/pets", dueno.verMascotas);
router.get('/profile/controls', dueno.verControles);
router.get('/profile/adopcion', dueno.verMascotasEnAdopcion);

router.post("/profile/editUser", dueno.editarDatosDueno);
router.post("/add-new-mascota-dueno", dueno.addMascota);
router.post("/edit-mascota-dueno", dueno.editMascota);
router.post("/addControl-dueno", dueno.addControl);
router.post("/editControl-dueno", dueno.editControl);

module.exports = router;