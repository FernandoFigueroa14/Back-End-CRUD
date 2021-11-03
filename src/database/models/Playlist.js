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
    const Playlist = sequelize.define(alias, cols, config)
  
    return Playlist;
  }