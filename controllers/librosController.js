const path = require('path');
const db = require('../src/database/models');
const { validationResult } = require('express-validator');

const Playlists = db.Playlist;
const Libros = db.Libro;

const librosController = {
        readLibros: async (req, res) => {
            await Libros.findAll()
                                    .then(libros => {
                                        console.log(libros);
                                        res.json({status: 200, libros});
                                    })
                                    .catch(error => console.log(error))
        },
        createLibro: async (req, res) => {
            console.log(req.body); // <= {id: number, nombre: text}
            
            let errors = validationResult(req);

            if (errors.isEmpty()) {

            await Libros.findOne({where: {titulo: req.body.titulo}})
                            .then(async libro => {
                                if(libro){
                                    res.json({estado: "Libro existente"});            
                                }else{
                                    await Libros.create(req.body)
                                                .then(resultado => {
                                                    console.log(resultado);
                                                    res.json({status: 201, estado: 'Libro creado'});
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                    res.json({estado: 'Error'});
                                                });
                                    await Libros.findOne({where: {titulo: req.body.titulo}})
                                    .then(async id => {
                                        await Playlists.findOne({where: {id_libro: id.id}})
                                        .then(async ID => {
                                            if(ID){
                                                res.json({estado: "Libro ya en playlist"})
                                            }else{
                                                await Playlists.create({
                                                    id_libro: id.id
                                                })
                                                .then(resultado => {
                                                    console.log(resultado);
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                    res.json({estado: 'Error'});
                                                });
                                            }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.json({estado: 'Error'});
                                    });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.json({estado: 'Error'});
                                    });
                                }
                                
                                console.log(libro);
                                res.json(libro);
                            })
                            .catch(error => {
                                console.log(error);
                                res.json({estado: "Error"});
                            });
                        } else {
                            // Si hay errores
                                res.json({status: 400, errors})
                            }

        },
        actualizarLibro: async (req, res) => {
            console.log(req.body);
            
            await Libros.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then((id) => {
                if(id[0]==1){
                    console.log("Libro actualizado");
                    res.json({status: 200, estado: "Libro actualizado"});
                }else{
                    res.json({status: 500, estado: "Libro inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });
        },
        borrarLibro: async (req, res) => {
            console.log(req.body);
            
            await Libros.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((id) => {
                if(id==1){
                    console.log("Libro eliminado de la playlist");
                    res.json({status: 200, estado: "Libro eliminado de la playlist"});
                }else{
                    res.json({status: 500, estado: "Libro inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });
            await Playlists.destroy({
                where: {
                    id_libro: req.body.id
                }
            })
            .then((id) => {
                if(id==1){
                    console.log("Libro eliminado de la playlist");
                    res.json({status: 200, estado: "Libro eliminado de la playlist"});
                }else{
                    res.json({status: 500, estado: "Libro inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });
        }
}

module.exports = librosController;