const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

/*
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.administrador = require("./admin.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.veterinario = require("./vet.model.js")(sequelize, Sequelize);
db.dueno = require("./owner.model.js")(sequelize, Sequelize);
db.instituto = require("./instit.model.js")(sequelize, Sequelize);
db.fichaadopcion = require("./adoptform.model.js")(sequelize, Sequelize);
db.control = require("./control.model.js")(sequelize, Sequelize);
db.mascota = require("./pet.model.js")(sequelize, Sequelize);

module.exports = db;
*/
module.exports = { sequelize };