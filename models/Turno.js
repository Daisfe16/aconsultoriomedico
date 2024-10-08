const db = require('./db');

class Turno {
  static obtenerTodos(callback) {
    db.query('SELECT * FROM turnos', (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados);
    });
  }

  static crear(datos, callback) {
    const { paciente_id, profesional_id, especialidad_id, fecha, hora } = datos;
    db.query('INSERT INTO turnos (paciente_id, profesional_id, especialidad_id, fecha, hora) VALUES (?, ?, ?, ?, ?)', 
      [paciente_id, profesional_id, especialidad_id, fecha, hora], 
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  }

  static obtenerPorId(id, callback) {
    db.query('SELECT * FROM turnos WHERE id = ?', [id], (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados[0]);
    });
  }

  static editar(id, datos, callback) {
    const { estado } = datos;
    db.query('UPDATE turnos SET estado = ? WHERE id = ?', 
      [estado, id], 
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  }
}

module.exports = Turno;
