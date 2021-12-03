const vet = require('../controllers/vet.controller')
var router = require("express").Router();

router.get("/vet", vet.Menu);
router.get("/vet/pets", vet.MenuMascotas);
router.get("/vet/ctrlforms", vet.Menu);
router.get("/vet/adoptforms", vet.Menu);

module.exports = router;