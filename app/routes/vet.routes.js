const vet = require('../controllers/perfilvet.controller')
var router = require("express").Router();

router.get("/vet", vet.Menu);
router.get("/vet/pets", vet.verMascotas);
router.get("/vet/controls", vet.verControles);
router.get("/vet/adopcion", vet.verFichasAdopcion);

router.post("/vet/editUser", vet.editarDatosVet);
router.post("/add-new-mascota-vet", vet.addMascota);
router.post("/edit-mascota-vet", vet.editMascota);
router.post("/addControl-vet", vet.addControl);
router.post("/editControl-vet", vet.editControl);

module.exports = router;