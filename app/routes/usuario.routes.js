const auth = require("../controllers/usuario.controller.js");

var router = require("express").Router();

// Create a new Tutorial
//router.post("/", usuario.create);

// Retrieve all usuario
//router.get("/", usuario.findAll);

router.get("/", auth.loginpage);

router.post("/start", auth.authenticateUserWithemail);

router.post("/", auth.saveUser);

router.get("/signin", auth.signpage);


// Retrieve a single Tutorial with id
router.get("/:id", auth.findOne);

// Update a Tutorial with id
router.put("/:id", auth.update);

// Delete a Tutorial with id
router.delete("/:id", auth.delete);


module.exports = router;