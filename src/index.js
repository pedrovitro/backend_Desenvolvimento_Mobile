const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const routes = require('./routes');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require('./app/controllers/authController')(app);
require('./app/controllers/CategoriaController')(app);
require('./app/controllers/CidadeController')(app);
require('./app/controllers/UsuarioController')(app);
require('./app/controllers/ReservaController')(app);
require('./app/controllers/EstabelecimentoController')(app);

//mudar de acordo com o controller

app.listen(3333);