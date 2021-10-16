const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

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