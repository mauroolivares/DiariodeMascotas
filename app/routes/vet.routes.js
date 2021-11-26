const vet = require('../controllers/vet.controller')
var router = require("express").Router();

router.get("/vet", vet.Menu);

module.exports = router;