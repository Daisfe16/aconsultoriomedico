const Turno = require('../models/turno');
const db = require('../models/db'); // Asegúrate de importar la conexión a la base de datos

// Mostrar todos los turnos
exports.mostrarTurnos = (req, res) => {
  Turno.obtenerTodos((err, turnos) => {
    if (err) {
      return res.status(500).send('Error al obtener turnos.');
    }
    res.render('turnos', { turnos });
  });
};

// Crear un nuevo turno
exports.crearTurno = (req, res) => {
  const turnoData = req.body;
  Turno.crear(turnoData, (err) => {
    if (err) {
      return res.status(500).send('Error al crear turno.');
    }
    res.redirect('/turnos'); // Redirige a la lista de turnos
  });
};

// Mostrar un turno específico
exports.mostrarTurno = (req, res) => {
  const turnoId = req.params.id;
  Turno.obtenerPorId(turnoId, (err, turno) => {
    if (err || !turno) {
      return res.status(404).send('Turno no encontrado.');
    }

    // Obtener los nombres utilizando las IDs
    const pacienteId = turno.paciente_id;
    const profesionalId = turno.profesional_id;
    const especialidadId = turno.especialidad_id;

    // Obtener el nombre del paciente
    db.query('SELECT nombre FROM pacientes WHERE id = ?', [pacienteId], (err, pacientes) => {
      if (err) return res.status(500).send('Error al obtener paciente.');
      const pacienteNombre = pacientes[0]?.nombre || 'No disponible';

      // Obtener el nombre del profesional
      db.query('SELECT nombre FROM profesionales WHERE id = ?', [profesionalId], (err, profesionales) => {
        if (err) return res.status(500).send('Error al obtener profesional.');
        const profesionalNombre = profesionales[0]?.nombre || 'No disponible';

        // Obtener el nombre de la especialidad
        db.query('SELECT nombre FROM especialidades WHERE id = ?', [especialidadId], (err, especialidades) => {
          if (err) return res.status(500).send('Error al obtener especialidad.');
          const especialidadNombre = especialidades[0]?.nombre || 'No disponible';

          // Pasar los datos a la vista
          res.render('turno', { 
            turno: { ...turno, pacienteNombre, profesionalNombre, especialidadNombre } 
          });
        });
      });
    });
  });
};

// Editar un turno
exports.editarTurno = (req, res) => {
  const turnoId = req.params.id;
  const turnoData = req.body;
  Turno.editar(turnoId, turnoData, (err) => {
    if (err) {
      return res.status(500).send('Error al editar turno.');
    }
    res.redirect('/turnos');
  });
};
