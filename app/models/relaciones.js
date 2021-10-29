const Usuario = require('./usuario.model')

const Administrador = require('./admin.model')
const Institucion = require('./instit.model')
const Dueno = require('./owner.model')
const Veterinario = require('./vet.model')

const fichaAdopcion = require('./adoptform.model')
const Mascota = require('./pet.model')
const Control = require('./control.model')

//Tipo de usuario y su rut asociado:
Administrador.belongsTo(Usuario, { as: "rutAdmin", foreignKey: "rut" });
Institucion.belongsTo(Usuario, { as: "rutInstit", foreignKey: "rut" });
Dueno.belongsTo(Usuario, { as: "rutDueno", foreignKey: "rut" });
Veterinario.belongsTo(Usuario, { as: "rutVet", foreignKey: "rut" });

//Tipo de usuario en un formulario de adopción:
fichaAdopcion.belongsTo(Veterinario, { as: "rutVet", foreignKey: "rutvet" });
fichaAdopcion.belongsTo(Usuario, { as: "rutUser", foreignKey: "rutusuario" }); //Dueño o Institucion
fichaAdopcion.belongsTo(Mascota, { as: "mascota", foreignKey: "idmascota" });

//Tipo de usuario en un control médico:
Control.belongsTo(Veterinario, { as: "rutVet", foreignKey: "rutvet" });
Control.belongsTo(Usuario, { as: "rutUser", foreignKey: "rutusuario" }); //Dueño o Institucion
Control.belongsTo(Mascota, { as: "mascota", foreignKey: "idmascota" });

//
Mascota.belongsTo(Usuario, { as: "rutUser", foreignKey: "rutusuario" }); //Dueño o Institucion

//module.exports = { Usuario, Administrador, Institucion, Dueno, Veterinario, fichaAdopcion, Mascota, Control }