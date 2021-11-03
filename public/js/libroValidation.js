const { body } = require('express-validator');

const libroValidation = [
    body('titulo')
        .notEmpty()
        .withMessage('Debes de colocar el título del libro'),
    body('autor')
        .notEmpty()
        .withMessage('Debes de colocar el autor del libro'),
    body('editorial')
        .notEmpty()
        .withMessage('Debes de colocar una editorial'),
    body('año')
        .notEmpty()
        .withMessage('Debes de colocar un año')
        .isLength({min: 4})
        .withMessage('Debes ingresar un año valido (4 caracteres)')
        .isNumeric()
        .withMessage('Debes de ingresar un valor numérico'),    
    body('edicion')
        .notEmpty()
        .withMessage('Debes de colocar la edición del libro')
        .isNumeric()
        .withMessage('Debes de ingresar un valor numérico'),
    body('fotoPortada')
        .notEmpty()
        .withMessage('Debes de colocar el link de la foto'),
]

module.exports = libroValidation;