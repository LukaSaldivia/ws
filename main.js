// import './server'

let messages_box = document.querySelector('#messages'); 

const socket = new WebSocket('ws://localhost:3000');

// Abre la conexión
socket.addEventListener('open', function (event) {
    // socket.send('En línea');
});

// Escucha por mensajes
socket.addEventListener('message', function (event) {
    // console.log('Message from server', event.data);
    // document.getElementById('respuesta').value=event.data;
    messageAppend('other',event.data)

});

const sendMessage = () => {
    let txt = document.querySelector("#texto").value;
    socket.send(txt)
    document.getElementById('texto').value = '';
    messageAppend('own',txt)
}

const messageAppend = (who,msg) => {
    let html = `<div class="msg">
    <span class="${who}">${msg}</span>
</div>`;

messages_box.insertAdjacentHTML('beforeend',html);
}

document.addEventListener('keypress',(e)=>{
    e.code == 'Enter' ? sendMessage():null;
})