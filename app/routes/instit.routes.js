const instit = require('../controllers/instit.controller')
var router = require("express").Router();

router.get("/instit", instit.institMenu);
router.get("/instit/vets", instit.instiVetsMenu);
router.get("/instit/pets", instit.institPetsMenu);
module.exports = router;