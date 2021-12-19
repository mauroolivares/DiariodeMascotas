const userctrl = require('./usuario.controller');

exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Institución") {
            //pagina tipo "404"
            console.log("no eres institucion")
            res.redirect("/")
        } else {
            next()
        }
    }
}

//Menu de institucion:
exports.institMenu = (req, res) => {
    res.render('perfilInstitucion', { instit: req.user });
}

exports.editarDatosInstit = async(req, res) => {
    const usuario = {
        rut,
        correo,
        password,
        nombrecompleto,
        descripcion,
        ubicacion,
        telefono,
        direccion,
        fechanacimiento,
        area,
        totalfunc,
        totalpuestos
    } = req.body;
    const usuarioedit = await userctrl.editarUsuario(usuario);
    const instiedit = await userctrl.editarInstitucion(usuario);
    Promise.all([usuarioedit, instiedit]).then(data => {
        console.log("Institución y Usuario Actualizado.")
        res.redirect("/logout");
    });
}

//Menu de Veterinarios de una Institucion:
exports.instiVetsMenu = async(req, res) => {
    const vets = await userctrl.listaVeterinarios(req.user.rut);
    res.render('veterinariosInstitucion', { veterinarios: vets, usuario: req.user });
}

//Añadir veterinario a una institución
exports.AddVetInst = async(req, res) => {
    const vet = {
        rut
    } = req.body;
    vet.rutinstitucion = req.user.rut;

    const vetedit = await userctrl.editarVeterinario(vet);
    Promise.all([vetedit]).then(data => {
        console.log("Veterinario agregado a la institución.")
        res.redirect("/instit/vets");
    });
}

//Desligar veterinario de una institución
exports.DropVetInst = async(req, res) => {
    const vet = {
        rut
    } = req.body;
    vet.rutinstitucion = null;

    const vetedit = await userctrl.editarVeterinario(vet);
    Promise.all([vetedit]).then(data => {
        console.log("Veterinario eliminado de la institución.")
        res.redirect("/instit/vets");
    });

}