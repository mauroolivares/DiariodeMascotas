const Usuario = require('./user.model')

const Administrador = require('./user_admin.model')
const Institucion = require('./user_instit.model')
const Dueno = require('./user_dueno.model')
const Veterinario = require('./user_vet.model')

const fichaAdopcion = require('./form_adoptform.model')
const Mascota = require('./form_pet.model')
const Control = require('./form_control.model')

//Tipo de usuario y su rut asociado:
Administrador.belongsTo(Usuario, { foreignKey: "rut" });
Institucion.belongsTo(Usuario, { foreignKey: "rut" });
Dueno.belongsTo(Usuario, { foreignKey: "rut" });
Veterinario.belongsTo(Usuario, { foreignKey: "rut" });
Usuario.hasMany(Institucion, { foreignKey: "rut" });
Usuario.hasMany(Administrador, { foreignKey: "rut" });
Usuario.hasMany(Veterinario, { foreignKey: "rut" });
Usuario.hasMany(Dueno, { foreignKey: "rut" });
Veterinario.belongsTo(Institucion, { foreignKey: { name: "rutinstitucion", allowNull: true } });

//Tipo de usuario en un formulario de adopción:
fichaAdopcion.belongsTo(Veterinario, { foreignKey: "rutvet", allowNull: true });
fichaAdopcion.belongsTo(Usuario, { foreignKey: "rutusuario" }); //Dueño o Institucion
fichaAdopcion.belongsTo(Mascota, { foreignKey: "idmascota" });

//Tipo de usuario en un control médico:
Control.belongsTo(Veterinario, { foreignKey: "rutvet", allowNull: true });
Control.belongsTo(Usuario, { foreignKey: "rutusuario" }); //Dueño o Institucion
Control.belongsTo(Mascota, { foreignKey: "idmascota" });

//
Dueno.hasMany(Mascota, { foreignKey: "id" });
Institucion.hasMany(Mascota, { foreignKey: "id" });
Mascota.belongsTo(Usuario, { foreignKey: "rutusuario" }) //Dueño o Institucion

//module.exports = { Usuario, Administrador, Institucion, Dueno, Veterinario, fichaAdopcion, Mascota, Control }