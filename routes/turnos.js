const express = require('express');
const router = express.Router();
const { validateTurno, validateEditTurno, handleValidationErrors } = require('../middleware/validations');
const db = require('../db'); // Asegúrate de tener un archivo de configuración de la base de datos

// Obtener todos los turnos
router.get('/', (req, res) => {
  db.query('SELECT * FROM turnos', (err, turnos) => {
    if (err) throw err;
    res.render('turnos/index', { turnos });
  });
});




// Crear un nuevo turno
router.get('/nuevo', (req, res) => {
  // Obtener datos necesarios (profesionales, especialidades, etc.)
  db.query('SELECT * FROM profesionales', (err, profesionales) => {
    if (err) throw err;
    res.render('turnos/nuevo', { profesionales });
  });
});

router.post('/nuevo', validateTurno, handleValidationErrors, (req, res) => {
  const { paciente_id, profesional_id, especialidad_id, fecha, hora } = req.body;

  const query = 'INSERT INTO turnos (paciente_id, profesional_id, especialidad_id, fecha, hora) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [paciente_id, profesional_id, especialidad_id, fecha, hora], (err) => {
    if (err) throw err;
    res.redirect('/turnos');
  });
});

// Editar un turno
router.get('/:id/editar', (req, res) => {
  const turnoId = req.params.id;

  db.query('SELECT * FROM turnos WHERE id = ?', [turnoId], (err, turnos) => {
    if (err) throw err;
    if (turnos.length === 0) return res.status(404).send('Turno no encontrado');

    db.query('SELECT * FROM profesionales', (err, profesionales) => {
      if (err) throw err;
      res.render('turnos/editar', { turno: turnos[0], profesionales });
    });
  });
});

router.post('/:id/editar', validateEditTurno, handleValidationErrors, (req, res) => {
  const { estado } = req.body;
  const turnoId = req.params.id;

  const query = 'UPDATE turnos SET estado = ? WHERE id = ?';
  db.query(query, [estado, turnoId], (err) => {
    if (err) throw err;
    res.redirect('/turnos');
  });
});

module.exports = router;
