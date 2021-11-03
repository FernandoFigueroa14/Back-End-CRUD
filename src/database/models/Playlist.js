module.exports=(sequelize, dataTypes) => {
    let alias ='Playlist'
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_cancion: {
        type: dataTypes.INTEGER,
        defaultValue: 0
      },
      id_libro: {
        type: dataTypes.INTEGER,
        defaultValue: 0
      }
    }
    let config ={
      tableName: 'playlist',
      timestamps: false
    }
    const Playlist = sequelize.define(alias, cols, config);

    Playlist.associate = function(modelos){
        Playlist.belongsTo(modelos.Cancion, {
            as: "cancion",
            foreignKey: "id_cancion"
        });
        Playlist.belongsTo(modelos.Libro, {
            as: "libro",
            foreignKey: "id_libro"
        });
    }
       
    return Playlist;
  }