const Profesional = require('../models/profesional');

// Mostrar todos los profesionales
exports.mostrarProfesionales = (req, res) => {
  Profesional.obtenerTodos((err, profesionales) => {
    if (err) {
      return res.status(500).send('Error al obtener profesionales.');
    }
    res.render('profesionales', { profesionales });
  });
};

// Crear un nuevo profesional
exports.crearProfesional = (req, res) => {
  const profesionalData = req.body;
  Profesional.crear(profesionalData, (err) => {
    if (err) {
      return res.status(500).send('Error al crear profesional.');
    }
    res.redirect('/profesionales'); // Redirige a la lista de profesionales
  });
};

// Mostrar un profesional específico
exports.mostrarProfesional = (req, res) => {
  const profesionalId = req.params.id;
  Profesional.obtenerPorId(profesionalId, (err, profesional) => {
    if (err || !profesional) {
      return res.status(404).send('Profesional no encontrado.');
    }
    res.render('profesional', { profesional });
  });
};

// Editar un profesional
exports.editarProfesional = (req, res) => {
  const profesionalId = req.params.id;
  const profesionalData = req.body;
  Profesional.editar(profesionalId, profesionalData, (err) => {
    if (err) {
      return res.status(500).send('Error al editar profesional.');
    }
    res.redirect('/profesionales');
  });
};
