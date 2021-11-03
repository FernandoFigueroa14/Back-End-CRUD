module.exports=(sequelize, dataTypes) => {
    let alias ='Cancion'
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      artista: {
        type: dataTypes.STRING
      },
      album: {
        type: dataTypes.STRING
      },
      duracion: {
        type: dataTypes.STRING
      },
      genero: {
        type: dataTypes.STRING
      },
      año:{
        type: dataTypes.INTEGER
      }, 
      link_spotify:{
          type: dataTypes.STRING
      }
    }
    let config ={
      tableName: 'canciones',
      timestamps: false
    }
    const Cancion = sequelize.define(alias, cols, config)
  
    return Cancion;
  }