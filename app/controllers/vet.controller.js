//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (req, res, next) => {
    if (req.user == undefined) {
        //no ha iniciado sesion
        console.log("inicia sesion primero")
        res.redirect("/")
    } else {
        if (req.user.tipo != "Veterinario") {
            //pagina tipo "404"
            console.log("no eres veterinario")
            res.redirect("/")
        } else {
            next()
        }
    }
}