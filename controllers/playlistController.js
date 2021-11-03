const path = require('path');
const db = require('../src/database/models');

const Playlists = db.Playlist;

const playlistController = {
        fullPlaylist: async (req, res) => {
            await Playlists.findAll({include: [
                {association: "cancion"},
                {association: "libro"}
                ]})
                                    .then(playlist => {
                                        console.log(playlist);
                                        res.json({status: 200, playlist});
                                    })
                                    .catch(error => console.log(error))
        },
        // buscarCiudad: async (req, res) => {
        //     console.log(req.body);
            
        //     await Canciones.findAll({where: req.body})
        //                     .then(ciudad => {
        //                         ciudad.forEach(async registro => {
        //                             await Canciones.update({interes: registro.interes+1},{where: {id: registro.id}})
        //                         .then(() => {
        //                             console.log("El interes ha aumentado");
        //                         })
        //                         .catch(error => {
        //                             console.log(error);
        //                             res.json({estado: "Error"});
        //                         });
        //                         });
        //                         console.log(ciudad);
        //                         res.json(ciudad);
        //                     })
        //                     .catch(error => {
        //                         console.log(error);
        //                         res.json({estado: "Ciudad/lugar no existente"});
        //                     });
        // }
}

module.exports = playlistController;