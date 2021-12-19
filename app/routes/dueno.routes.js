const dueno = require('../controllers/perfildueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.isAuthenticated, dueno.Menu);
router.get("/profile/pets", dueno.isAuthenticated, dueno.verMascotas);
router.get('/profile/controls', dueno.isAuthenticated, dueno.verControles);
router.get('/profile/adopcion', dueno.isAuthenticated, dueno.verMascotasEnAdopcion);

router.post("/profile/editUser", dueno.editarDatosDueno);
router.post("/add-new-mascota-dueno", dueno.addMascota);
router.post("/edit-mascota-dueno", dueno.editMascota);
router.post("/addControl-dueno", dueno.addControl);
router.post("/editControl-dueno", dueno.editControl);
router.post("/adoptar-mascota", dueno.adoptarMascota);

module.exports = router;