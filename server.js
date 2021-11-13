const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const sequelize = require("./app/config/sequelize.config").sequelize;
require('dotenv').config();

const app = express()
app.set('appName', 'Diario de Mascotas');

//Enrutado e implementado de relacion de tablas:
require("./app/models/models_relations");
app.use(require('./app/routes/usuario.routes.js'));

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
    session({
        // Key we want to keep secret which will encrypt all of our information
        secret: process.env.SESSION_SECRET,
        // Should we resave our session variables if nothing has changes which we dont
        resave: false,
        // Save empty value if there is no vaue which we do not want to do
        saveUninitialized: false
    })
);

app.use(passport.initialize())
app.use(passport.session())

require('./app/config/passport.config')

sequelize.sync({ force: false }).then(function() {
    console.log("DB Configurada");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(app.get('appName'));
    console.log(`Servidor en http://localhost:${PORT}`);
});

module.exports = sequelize;