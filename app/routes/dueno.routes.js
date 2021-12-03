const dueno = require('../controllers/dueno.controller')
var router = require("express").Router();

router.get("/profile", dueno.Menu);
router.get("/profile/pets", dueno.MascotaMenu);
router.get('/profile/controls', dueno.ControlesMenu);
//router.get('/ver-controles', dueno.ControlesMascota);
//router.post('/ver-controles', dueno.ControlesMascota);
//router.get("/profile/pets/controls", dueno.MascotaControles);

router.post("/add-new-mascota", dueno.addMascota);
router.post("/editar-mascota-usuario", dueno.editMascota);
module.exports = router;