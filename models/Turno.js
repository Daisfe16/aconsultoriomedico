const db = require('./db');

class Turno {
  static obtenerTodos(callback) {
    db.query(`SELECT turnos.id, turnos.estado, pacientes.nombre_completo AS paciente_nombre, turnos.fecha, turnos.hora, 
                     sucursales.nombre AS sucursal_nombre, especialidades.nombre AS especialidad_nombre, 
                     profesionales.nombre_completo AS profesional_nombre
              FROM turnos
              JOIN pacientes ON turnos.paciente_id = pacientes.id
              JOIN profesionales ON turnos.profesional_id = profesionales.id
              JOIN especialidades ON turnos.especialidad_id = especialidades.id
              JOIN sucursales ON turnos.sucursal_id = sucursales.id`, (err, resultados) => {
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
    db.query(`SELECT turnos.id, turnos.estado, pacientes.nombre_completo AS paciente_nombre, turnos.fecha, turnos.hora, 
                     sucursales.nombre AS sucursal_nombre, especialidades.nombre AS especialidad_nombre, 
                     profesionales.nombre_completo AS profesional_nombre
              FROM turnos
              JOIN pacientes ON turnos.paciente_id = pacientes.id
              JOIN profesionales ON turnos.profesional_id = profesionales.id
              JOIN especialidades ON turnos.especialidad_id = especialidades.id
              JOIN sucursales ON turnos.sucursal_id = sucursales.id
              WHERE turnos.id = ?`, [id], (err, resultados) => {
      if (err) return callback(err);
      callback(null, resultados[0]);
    });
  }

  static editar(id, datos, callback) {
    const { paciente_id, profesional_id, especialidad_id, sucursal_id, fecha, hora, estado } = datos;
  
    db.query(
      `UPDATE turnos SET paciente_id = ?, profesional_id = ?, especialidad_id = ?, sucursal_id = ?, fecha = ?, hora = ?, estado = ?
       WHERE id = ?`,
      [paciente_id, profesional_id, especialidad_id, sucursal_id, fecha, hora, estado, id],
      (err) => {
        if (err) return callback(err);
        callback(null);
      }
    );
  }
  
  

  static eliminar(id, callback) {
    db.query('DELETE FROM turnos WHERE id = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
  
}


module.exports = Turno;
