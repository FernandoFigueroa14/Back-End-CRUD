const express = require('express');
const path = require('path');

const PORT = process.env.PORT | 8080;

//Establecer un middleware que configure donde se encuentran los
//recursos públicos
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('html',require('ejs').renderFile)
app.set('view engine','ejs')

app.listen(PORT, () => `Server running in port: ${PORT} :D`)