const vet = require('../controllers/vet.controller')
var router = require("express").Router();

router.get("/vet", vet.Menu);
router.get("/vet/pets", vet.MascotasMenu);
router.get("/vet/controls", vet.ControlesMenu);
router.get("/vet/adopcion", vet.Menu);

router.post("/vet/editUser", vet.editarDatosVet);
router.post("/add-new-mascota-vet", vet.addMascota);
router.post("/edit-mascota-vet", vet.editMascota);
router.post("/addControl-vet", vet.addControl);
router.post("/editControl-vet", vet.editControl);

module.exports = router;