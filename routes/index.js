const express = require('express');
const router = express.Router();

// Importar controladores
const agendaController = require('../controllers/agendaController');
const turnoController = require('../controllers/turnosController');

// Ruta principal (homepage)
router.get('/', (req, res) => {
    res.render('index'); // Renderizar la vista de inicio
});

// Rutas para las agendas
router.get('/agendas', agendaController.mostrarAgendas); // Mostrar todas las agendas
router.post('/agendas', agendaController.crearAgenda); // Crear una nueva agenda
router.get('/agendas/:id', agendaController.mostrarAgenda); // Mostrar una agenda específica
router.post('/agendas/edit/:id', agendaController.editarAgenda); // Editar una agenda

// Rutas para los turnos
router.get('/turnos', turnoController.mostrarTurnos); // Mostrar todos los turnos
router.get('/turnos/nuevo', (req, res) => {
    res.render('nuevoTurno'); // Renderizar vista para crear nuevo turno
});
router.post('/turnos', turnoController.crearTurno); // Crear un nuevo turno
router.get('/turnos/:id', turnoController.mostrarTurno); // Ver el detalle del turno
router.get('/turnos/:id/editar', turnoController.mostrarFormularioEditarTurno); // Mostrar el formulario de edición
router.post('/turnos/:id/editar', turnoController.editarTurno); // Procesar la edición

router.post('/turnos/:id/eliminar', turnoController.eliminarTurno); // Eliminar el turno

// Exportar las rutas
module.exports = router;
