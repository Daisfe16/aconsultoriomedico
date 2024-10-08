const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const nodemon = require('nodemon'); // Asegúrate de que nodemon esté instalado
const routes = require('./routes/index'); // Asegúrate de que esta ruta sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra el error en la consola
    res.status(500).render('error', { message: 'Algo salió mal, por favor intenta de nuevo más tarde.' });
  });
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos estáticos
app.use(session({
  secret: 'tu_secreto_aqui', // Cambia esto por un secreto real
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rutas
app.use('/', routes); // Asegúrate de que tus rutas estén correctamente definidas

// Manejo de errores
app.use((req, res, next) => {
  const err = new Error('No encontrado');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
