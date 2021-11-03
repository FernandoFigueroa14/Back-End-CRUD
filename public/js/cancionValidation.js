const { body } = require('express-validator');

const cancionValidation = [
    body('nombre')
        .notEmpty()
        .withMessage('Debes de colocar el nombre de la canción'),
    body('artista')
        .notEmpty()
        .withMessage('Debes de colocar el artista de la canción'),
    body('album')
        .notEmpty()
        .withMessage('Debes de colocar el album de la canción'),
    body('duracion')
        .notEmpty()
        .withMessage('Debes de colocar la duración')
        .isLength({min: 4})
        .withMessage('Debes ingresar una duración valida (ejemplo -> 2:32)'),    
    body('genero')
        .notEmpty()
        .withMessage('Debes de colocar el genero')
        .isLength({min: 3})
        .withMessage('No hay generos de menos de 3 caracteres'),
    body('año')
        .notEmpty()
        .withMessage('Debes de colocar el año de lanzamiento')
        .isLength({min: 4})
        .withMessage('Debes ingresar un año valido (4 caracteres)')
        .isNumeric()
        .withMessage('Debes de ingresar un valor numérico'),
    body('link_spotify')
        .notEmpty()
        .withMessage('Debes de colocar tu descripción'),
]

module.exports = cancionValidation;