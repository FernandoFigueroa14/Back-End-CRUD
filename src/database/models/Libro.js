module.exports=(sequelize, dataTypes) => {
    let alias ='Libro'
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      titulo: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      autor: {
        type: dataTypes.STRING
      },
      editorial: {
        type: dataTypes.STRING
      },
      año: {
        type: dataTypes.INTEGER
      },
      edicion:{
          type: dataTypes.INTEGER
      },
      fotoPortada:{
          type: dataTypes.STRING
      }
    }
    let config ={
      tableName: 'libros',
      timestamps: false
    }
    const Libro = sequelize.define(alias, cols, config)
  
    return Libro;
  }