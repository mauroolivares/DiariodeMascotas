const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const sequelize = require("./app/config/sequelize.config").sequelize;
require("./app/models/models_relations");

const app = express();

var corsOptions = {
    origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('appName', 'Diario de Mascotas');
app.use(
    session({
        // Key we want to keep secret which will encrypt all of our information
        secret: 'secret',
        // Should we resave our session variables if nothing has changes which we dont
        resave: false,
        // Save empty value if there is no vaue which we do not want to do
        saveUninitialized: false
    })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

require('./app/config/passport.config');

app.use(flash());

sequelize.sync({ force: false }).then(function() {
    console.log("DB Configurada");
});

app.use(require('./app/routes/admin.routes'));
app.use(require('./app/routes/dueno.routes'));
app.use(require('./app/routes/instit.routes'));
app.use(require('./app/routes/usuario.routes'));
app.use(require('./app/routes/vet.routes'));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(app.get('appName'));
    console.log(`Servidor en http://localhost:${PORT}`);
});