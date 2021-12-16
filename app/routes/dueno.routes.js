const dueno = require('../controllers/dueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.Menu);
router.get("/profile/pets", dueno.MascotaMenu);
router.get('/profile/controls', dueno.ControlesMenu);
router.get('/profile/adopcion', dueno.verMascotasEnAdopcion);

router.post("/profile/editUser", dueno.editarDatosDueno);
router.post("/add-new-mascota-dueno", dueno.addMascota);
router.post("/edit-mascota-dueno", dueno.editMascota);
router.post("/addControl-dueno", dueno.addControl);
router.post("/editControl-dueno", dueno.editControl);

module.exports = router;