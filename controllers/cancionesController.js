const path = require('path');
const db = require('../src/database/models');
const { validationResult } = require('express-validator');

const Playlists = db.Playlist;
const Canciones = db.Cancion;

const cancionesController = {
        readCanciones: async (req, res) => {
            await Canciones.findAll()
                                    .then(canciones => {
                                        console.log(canciones);
                                        res.json({status: 200, canciones});
                                    })
                                    .catch(error => console.log({status: 500, error}))
        },
        createCancion: async (req, res) => {
            console.log(req.body); // <= {id: number, nombre: text}

            let errors = validationResult(req);

            if (errors.isEmpty()) {
            // No hay errores, seguimos adelante.
            await Canciones.findOne({where: {nombre: req.body.nombre}})
            .then(async cancion => {
                if(cancion){
                    res.json({estado: "Cancion existente"});            
                }else{
                    await Canciones.create(req.body)
                                .then(resultado => {
                                    console.log(resultado);
                                    res.json({status: 201, estado: 'Cancion creada'});
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json({estado: 'Error'});
                                });
                    await Canciones.findOne({where: {nombre: req.body.nombre}})
                    .then(async id => {
                        await Playlists.findOne({where: {id_cancion: id.id}})
                        .then(async ID => {
                            if(ID){
                                res.json({estado: "Canción ya en playlist"})
                            }else{
                                await Playlists.create({
                                    id_cancion: id.id
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
                
                console.log(cancion);
                res.json(cancion);
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
        actualizarCancion: async (req, res) => {
            console.log(req.body);
            
            await Canciones.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then((id) => {
                if(id[0]==1){
                    console.log("Canción actualizada");
                    res.json({status: 200, estado: "Canción actualizada"});
                }else{
                    res.json({status: 500, estado: "Canción inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });
        },
        borrarCancion: async (req, res) => {
            console.log(req.body);
            
            await Canciones.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((id) => {
                if(id[0]==1){
                    console.log("Canción eliminada");
                    res.json({status: 200, estado: "Canción eliminada"});
                }else{
                    res.json({status: 500, estado: "Canción inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });

            await Playlists.destroy({
                where: {
                    id_cancion: req.body.id
                }
            })
            .then((id) => {
                if(id[0]==1){
                    console.log("Canción eliminada de la playlist");
                    res.json({status: 200, estado: "Canción eliminada de la playlist"});
                }else{
                    res.json({status: 500, estado: "Canción inexistente"});
                }
            })
            .catch(error => {
                console.log(error);
                res.json({estado: "Error"});
            });
        }
}

module.exports = cancionesController;