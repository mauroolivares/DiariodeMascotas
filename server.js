const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

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
        secret: process.env.SESSION_SECRET,
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
app.use(flash());

const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
    res.render("login");
});

require("./app/routes/usuario.routes.js")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(app.get('appName'));
    console.log(`Servidor en http://localhost:${PORT}`);
});