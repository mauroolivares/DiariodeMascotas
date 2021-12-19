const vet = require('../controllers/perfilvet.controller')
var router = require("express").Router();

router.get("/vet", vet.isAuthenticated, vet.Menu);
router.get("/vet/pets", vet.isAuthenticated, vet.verMascotas);
router.get("/vet/controls", vet.isAuthenticated, vet.verControles);
router.get("/vet/adopcion", vet.isAuthenticated, vet.verFichasAdopcion);

router.post("/vet/editUser", vet.editarDatosVet);
router.post("/add-new-mascota-vet", vet.addMascota);
router.post("/edit-mascota-vet", vet.editMascota);
router.post("/addControl-vet", vet.addControl);
router.post("/editControl-vet", vet.editControl);
router.post("/add-adoption-vet", vet.ponerEnAdopcion);
router.post("/request-adoption-vet", vet.responderSolicitud);

module.exports = router;