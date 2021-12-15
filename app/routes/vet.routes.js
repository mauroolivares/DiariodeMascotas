const vet = require('../controllers/vet.controller')
var router = require("express").Router();

router.get("/vet", vet.Menu);
router.get("/vet/pets", vet.MenuMascotas);
router.post("/vet/editUser", vet.editarDatosVet);

/*
router.post("/add-new-mascota", vet.addMascota);
router.post("/addControl", vet.addControl);
router.post("/editar-mascota", vet.editMascota);
router.get("/vet/ctrlforms", vet.Menu);
router.get("/vet/adoptforms", vet.Menu);
*/
module.exports = router;