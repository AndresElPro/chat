const socket = io() // Ejecutamos io, por lo general hay que ingresar el dominio al menos que estemos en local, lo general cuando estamos en local se configura solo

// DOM elements o elementos de HTML
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

btn.addEventListener('click', function() {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    }) // Para emitirle los datos al servidor, con el nombre de 'chat:message', como solo se puede enviar un dato, le enviamos un objeto de js con los 2 datos
})

message.addEventListener('keypress', function() { // Cuando este tipiando en el div message, realizara una función
    socket.emit('chat:typing', username.value) // Enviaremos el nombre del usuario cuando este tipiando
})

socket.on('chat:message', function(data) {
    actions.innerHTML = '' // Para eliminar el typing, para siempre
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
}) // Esta escuchando del servidor, con on() a diferencia de emitir con emit()

socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})