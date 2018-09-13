const path = require('path') // Este modulo de nodejs se encarga de trabajar con las rutas, unir directorios utilizado en la linea 14
const express = require('express')
const app = express() // app tendrá todas las configuraciones del servidor
const SocketIO = require('socket.io') // Requiriendo el modulo de socket.io

// Configuraciones
app.set('port', process.env.PORT || 3000) // Toma un puerto si esta configurado(sirve para desplegar la app en la nube o algo) en el s.o. sino el 3000

// Static files // Archivos estaticos
// Vamos enviarles todos los archivos estaticos de la carpeta public osea el frontend a los navegadores o clientes
// Utiliza un moedulo de express llamado static que es para poder enviar archivos estaticos, y hay que especificarle la ruta
app.use(express.static(path.join(__dirname, 'public'))) // el metodo join une los 2 directorios sin importar que o.s. estemos utilizando ya que cambia la forma de unirlos según el s.o.

// Iniciar el servidor
const server = app.listen(app.get('port'), () => { // Obtenemos lo que configuramos arriba y ejecutamos una función
    console.log('Server on Port', app.get('port')) // Lo que hace la función es mostrar en que puerto esta alojado el server y denuevo utilizamos la variable de arriba donde configuramos el puerto
})

const io = SocketIO(server) // socket.io recibe un server y este este es el que definimos cuando lo iniciamos en la linea 17, y io es la variable que tiene la conexión

// websockets, escucha eventos
io.on('connection', (socket) => {
    console.log('new connection', socket.id )

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data) // io es la conexión entera con todos los clientes, y a todos los sockets que están conectados vamos a emitirle un evento emit(), entonces recibimos los datos y después lo enviamos a todos lo navegadores
    }) // socket al cúal estoy conectado voy a escuchar su evento llamado chat:message, y vamos a recibir son datos 'data', y lo manejamos con una función

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data) // broadcast para emitirlo a todos exepto yo
    })
}) // on(), es el método y connection el nombre del evento y lo que hará este evento es enviar un console.log() cuando alguien se conecte
