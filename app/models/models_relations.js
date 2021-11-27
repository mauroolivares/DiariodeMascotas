const Usuario = require('./user.model')

const Administrador = require('./user_admin.model')
const Institucion = require('./user_instit.model')
const Dueno = require('./user_dueno.model')
const Veterinario = require('./user_vet.model')

const fichaAdopcion = require('./form_adoptform.model')
const Mascota = require('./form_pet.model')
const Control = require('./form_control.model')

//Tipo de usuario y su rut asociado:
Administrador.belongsTo(Usuario, { as: "rutAdmin", foreignKey: "rut" });
Institucion.belongsTo(Usuario, { as: "rutInstit", foreignKey: "rut" });
Dueno.belongsTo(Usuario, { as: "rutDueno", foreignKey: "rut" });
Veterinario.belongsTo(Usuario, { as: "rutVet", foreignKey: "rut" });
Veterinario.belongsTo(Institucion, { as: "rutInst", foreignKey: { name: "rutinstitucion", allowNull: true } });

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