const socket = io.connect('http://localhost:3000')

//query DOM

const button = document.getElementById('send')
const output = document.getElementById('output')
const handle = document.getElementById('handle')
const message = document.getElementById('message')
const feedback = document.getElementById('feedback')

//emit events

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = ""
})

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value)
})

//listening for events

socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ":" +'</strong>' + data.message+ '</p>'
    feedback.innerHTML = ""
})

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + " is typing" + '</em></p>'
})