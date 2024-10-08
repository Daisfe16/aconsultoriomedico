const db = require('./db');

class Profesional {
  static obtenerTodos(callback) {
    db.query('SELECT * FROM profesionales', (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados);
    });
  }

  static crear(datos, callback) {
    const { nombre, especialidad, matricula } = datos;
    db.query('INSERT INTO profesionales (nombre, especialidad, matricula) VALUES (?, ?, ?)', 
      [nombre, especialidad, matricula], 
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  }

  static obtenerPorId(id, callback) {
    db.query('SELECT * FROM profesionales WHERE id = ?', [id], (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados[0]);
    });
  }

  static editar(id, datos, callback) {
    const { nombre, especialidad, matricula } = datos;
    db.query('UPDATE profesionales SET nombre = ?, especialidad = ?, matricula = ? WHERE id = ?', 
      [nombre, especialidad, matricula, id], 
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  }
}

module.exports = Profesional;
