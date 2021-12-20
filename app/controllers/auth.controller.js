const logger = require('../config/logging.config')
//Verificador para determinar si inició sesion, y si pertenece al tipo correspondiente
exports.isAuthenticated = (usuario, tipo) => {
    if (usuario == undefined) {
        logger.error("< No has iniciado sesión correctamente >")
        return false
        
    } else {
        if (usuario.tipo != tipo) {
            logger.error(`< No eres del tipo: ${tipo} para ingresar a esta página >`)
            return false;
        } else {
            return true;
        }
    }
}

//Sitio para iniciar sesion:
exports.loginpage = (req, res) => {
    logger.log(`Cierre abrupto de sesión.\n\n`)
    req.logout();
    res.render('paginaPrincipal');
}

//Sitio para registrar usuario fuera de sesión:
exports.signpage = (req, res) => {
    res.render('register');
}

//Función para cerrar sesion:
exports.logout = (req, res) => {
    logger.log(`Has cerrado sesión, adiós ${req.user.nombrecompleto}.\n\n`)
    console.log("En el archivo 'logs/sessionlog.txt' se encuentran todas las acciones hechas en esta sesión.")
    console.log("Revisa el archivo'/logs/errorlog.txt' para comprobar el registro de errores en la sesión.")
    req.logout();
    res.redirect("/");
}

//Funcion para redirigir inicio de sesión:
exports.login = async(req, res) => {    
    logger.log(`-> Has ingresado con el rut ${req.user.rut} y el tipo ${req.user.tipo}, bienvenido.`);
    switch (req.user.tipo) {
        case "Administrador":
            res.redirect("/admin")
            break;

        case "Institucion":
            res.redirect("/instit")
            break;

        case "Veterinario":
            res.redirect("/vet")
            break;

        case "Dueno":
            res.redirect("/profile")
            break;
    }
    res.end()
}
