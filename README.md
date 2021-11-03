
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

Continuando con el desarrollo del CRUD, el método de actualizarCancion sube los cambios en caso de realizar alguno. Muestra un mensaje de actualización para mejorar la experiencia de nuestro usuario:

```sh
await Canciones.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(() => {
                console.log("Cancion actualizada");
                res.json({status: 200, estado: "Cancion actualizada"});
            })
```

Finalmente el método de borrar elimina el ID respectivo directamente de nuestra instancia:

```sh
await Canciones.update(req.body, {
  await Canciones.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(() => {
                console.log("Cancion eliminada");
                res.json({status: 200, estado: "Cancion eliminada"});
            })
```



- librosController.js:
Cuanta con las mismas funcionalidades de lectura, actualización, creación y borrado de nuestros elementos que componen la lista de libtos.

- playlistController.js:
Pasamos con el controlador de ambas listas. Cre un vínculo entre ambas (libros y canciones) para la lectura unificada:

```sh

const playlistController = {
        fullPlaylist: async (req, res) => {
            await Playlists.findAll({include: [
                {association: "cancion"},
                {association: "libro"}

```

Debido a que los métodos de ambas playlista se hicieron individualmente, fue necesario crear este controlador para la lectura de ambas y poder mostrar en nuestro front de una manera más sencilla.

Esta misma muestra el vínculo en un formato JSON:

```sh

                                    .then(playlist => {
                                        console.log(playlist);
                                        res.json(playlist);
                                    })
                                    .catch(error => console.log(error))

```

![App Screenshot](public/images/View_Main.jpg)


## _Diagrama de relación de la base de datos_
El diagrama de las relaciones de las tablas de nuestra base de datos es el siguiente:

<img src="./public/images/DB.png" alt="DB"/> Fer, te amo. :3 te necesito. Choose me.

En este se puede observar que si el id apunta a un libro el id de la canción será cero y viceversa.

# _Servicios_
A continuacion se enlistan los servicios realizados para la playlist, estos se dividen en servicios de:

- Playlist
- Canciones
- Libros

## _Playlist_
Para la platlist se realizo solo el servicio de Read para poder leer todas las canciones y los libros que existen en la playlist. Esta tabla puede ser considerada como tabla pivote ya que es la que contiene la relación con la tabla de canciones y la relación con la tabla de libros.

- Endpoint: /playlist
- Método: GET
- Respuesta: HTTP status 200 
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
Se asocia la informacion de la tablas de canciones y libros para poder mostrarlas en el Front-end de una manera más sencilla. 

## _Canciones_
Los servicios de la tabla de canciones son los cuatro del CRUD. Se describen a continuación:

### _Obtener todas las canciones_
Este servicio obtiene todas las canciones existentes en la playlist y las entrega en un arreglo de todas las canciones.

- Endpoint: /playlist/canciones
- Método: GET
- Respuesta 



### _Añadir una canción nueva a la playlist_

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |

### _Actualizar una canción de la playlist_
### _Borrar una canción de la playlist_

## _Libros_
Los servicios de la tabla de libros son los cuatro del CRUD. Se describen a continuación:

### _Obtener todos los libros_
### _Añadir un libro nuevo a la playlist_
### _Actualizar un libro de la playlist_
### _Borrar un libro de la playlist_
