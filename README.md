
# Playlists de libros y canciones (documentación)
Realizar el back-end para realizar playlists de libros y canciones. Deberá incluir operaciones de tipo CRUD (Create, Read, Update, Delete). 

## _¿Cómo instalar los módulos necesarios?_
El proyecto esta construido con las dependencias de Node.js
Al iniciaizarlo, abrir una terminal dentro del repositorio principal e ingresar:
```sh
npm install 
```

Las dependencias de nuestro archivo serán instaladas con la última versión trabajada. Una vez hecho esto, dentro del mismo repositorio:
```sh
node index.js
```
Para correrlo.

## _Estructura del proyecto_
El proyecto se encuentra dividido en distintas carpetas. Es imperativo que cada una de ellas se encuentre en el repositorio/ubicación especificado a continuación:

- Controllers
- Public
  - css
  - images
  - js
- Routes
- src
- views
- Archivos individuales:
  - sequelizerc
  - index.js

Con lo anterior, se explica cada uno de ellos:

## _Controllers_
Esta misma cuenta con todos los controladores del sistema CRUD. Se enlistan cada uno de los archivos:
- cancionesController.js:
Cuenta con la función de lectura de canciones. Ella realiza un mapeo con el método findAll() proporcionado por el archivo JSON en nuestra base de datos.

Nuestra función de "createCancion", realiza una petición a nuestra instancia para agregar una canción a nuestra Playlist. Antes del proceso, verifica que no existan errores.

```sh
console.log(req.body); // <= {id: number, nombre: text}

            let errors = validationResult(req);

            if (errors.isEmpty()) {
            // No hay errores, seguimos adelante.
            await Canciones.findOne({where: {nombre: req.body.nombre}})
```
-




# _Servicios_
A continuacion se enlistan los servicios realizados para la playlist, estos se dividen en servicios de:

- Playlist
- Canciones
- Libros

## _Playlist_
Para la platlist se realizo solo el servicio de Read para poder leer todas las canciones y los libros que existen en la playlist. Esta tabla puede ser considerada como tabla pivote ya que es la que contiene la relación con la tabla de canciones y la relación con la tabla de libros.

- Endpoint: /playlist
- Método: GET
- respuesta:
```sh
[
    {
        "id": 2,
        "id_cancion": 1,
        "id_libro": 0,
        "cancion": {
            "id": 1,
            "nombre": "Te mudaste",
            "artista": "Bad Bunny",
            "album": "El Ultimo Tour Del Mundo",
            "duracion": "2:11",
            "genero": "Reggaeton",
            "año": 2020,
            "link_spotify": "https://open.spotify.com/track/5RubKOuDoPn5Kj5TLVxSxY?si=344ff5895ded446b"
        },
        "libro": null
    },
    {
        "id": 3,
        "id_cancion": 2,
        "id_libro": 0,
        "cancion": {
            "id": 2,
            "nombre": "El mundo es mío",
            "artista": "Bad Bunny",
            "album": "El Ultimo Tour Del Mundo",
            "duracion": "2:46",
            "genero": "Reggaeton",
            "año": 2020,
            "link_spotify": "https://open.spotify.com/track/36DHxTW2xdr9GG15T9oK9L?si=55fb46f86eaa49a4"
        },
        "libro": null
    },
    {
        "id": 4,
        "id_cancion": 0,
        "id_libro": 1,
        "cancion": null,
        "libro": {
            "id": 1,
            "titulo": "Dime quien soy",
            "autor": "Julio Navarro",
            "editorial": "Planeta",
            "año": 2010,
            "edicion": 1,
            "fotoPortada": "https://th.bing.com/th/id/OIP.1W1hg1sTvHelDtsUNfEA7wHaLH?w=123&h=184&c=7&r=0&o=5&pid=1.7"
        }
    }
]
```
Se asocia la informacion de la tablas de canciones y 

## _Canciones_
Los servicios de la tabla de canciones son los cuatro del CRUD

## _Libros_