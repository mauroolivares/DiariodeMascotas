const usuario = require("../controllers/usuario.controller.js");

var router = require("express").Router();

// Create a new Tutorial
//router.post("/", usuario.create);

// Retrieve all usuario
//router.get("/", usuario.findAll);

router.get("/", usuario.loginpage);

router.post("/start", usuario.findOne);

router.post("/", usuario.saveUser);

router.get("/signin", usuario.signpage);

// Retrieve all published usuario
router.get("/published", usuario.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", usuario.findOne);

// Update a Tutorial with id
router.put("/:id", usuario.update);

// Delete a Tutorial with id
router.delete("/:id", usuario.delete);

// Create a new Tutorial
router.delete("/", usuario.deleteAll);

module.exports = router;