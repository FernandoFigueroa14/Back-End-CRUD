const router = require('express').Router();
const playlistController = require('../controllers/playlistController');
const cancionesController = require('../controllers/cancionesController');
const librosController = require('../controllers/librosController');
const cancionValidation = require('../public/js/cancionValidation');
const libroValidation = require('../public/js/libroValidation');

//Playlist
router.get('/', playlistController.fullPlaylist);

//Canciones
router.get('/canciones', cancionesController.readCanciones);
router.post('/canciones/agregar', cancionValidation, cancionesController.createCancion);
router.post('/canciones/actualizar', cancionesController.actualizarCancion);
router.post('/canciones/borrar', cancionesController.borrarCancion);

//Libros
router.get('/libros', librosController.readLibros);
router.post('/libros/agregar', libroValidation, librosController.createLibro);
router.post('/libros/actualizar', librosController.actualizarLibro);
router.post('/libros/borrar', librosController.borrarLibro);

module.exports = router;