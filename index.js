//Importando la biblioteca express
const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize'); //Conexión base de datos
const userConfigDB = require('./database/config/config');
const db = require('./database/models')

const playlistRouter = require('./routes/playlist');

const app = express();

const PORT = process.env.PORT | 8080;

//Establecer un middleware que configure donde se encuentran los recursos públicos
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

app.use('/playlist', playlistRouter);


db.sequelize.sync()
            .then(
                app.listen(PORT, () => {
                    console.log(`Server running on Port: ${PORT} :D`);
                }))
            .catch(err=>console.log(err))

const checkConectionDB = async () => {
    const userConfigDB_Development = userConfigDB.development
    const sequelize = new Sequelize(userConfigDB_Development.database, userConfigDB_Development.username, userConfigDB_Development.password, {
      host: userConfigDB_Development.host,
      port: userConfigDB_Development.port,
      dialect: userConfigDB_Development.dialect
    })
    try {
      await sequelize.authenticate()
      console.log('Connection to MySQL DataBase has been established successfully');
    } catch (error) {
      console.error('Unable to connect to the database: ', error)
    }
  };
  
  checkConectionDB();
