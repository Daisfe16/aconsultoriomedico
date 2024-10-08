const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de tener un archivo de configuración de la base de datos

// Obtener todos los profesionales
router.get('/', (req, res) => {
  db.query('SELECT * FROM profesionales', (err, profesionales) => {
    if (err) throw err;
    res.render('profesionales/index', { profesionales });
  });
});

// Crear un nuevo profesional
router.get('/nuevo', (req, res) => {
  res.render('profesionales/nuevo');
});

router.post('/nuevo', (req, res) => {
  const { nombre, especialidad, matricula } = req.body;

  const query = 'INSERT INTO profesionales (nombre, especialidad, matricula) VALUES (?, ?, ?)';
  db.query(query, [nombre, especialidad, matricula], (err) => {
    if (err) throw err;
    res.redirect('/profesionales');
  });
});

// Editar un profesional
router.get('/:id/editar', (req, res) => {
  const profesionalId = req.params.id;

  db.query('SELECT * FROM profesionales WHERE id = ?', [profesionalId], (err, profesionales) => {
    if (err) throw err;
    if (profesionales.length === 0) return res.status(404).send('Profesional no encontrado');
    res.render('profesionales/editar', { profesional: profesionales[0] });
  });
});

router.post('/:id/editar', (req, res) => {
  const { nombre, especialidad, matricula } = req.body;
  const profesionalId = req.params.id;

  const query = 'UPDATE profesionales SET nombre = ?, especialidad = ?, matricula = ? WHERE id = ?';
  db.query(query, [nombre, especialidad, matricula, profesionalId], (err) => {
    if (err) throw err;
    res.redirect('/profesionales');
  });
});

module.exports = router;
