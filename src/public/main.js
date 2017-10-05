import io from 'socket.io-client';
const socket = io('http://localhost:8081');
let ready = false;

socket.on('connect', () => {
    socket.emit('salut');
});

socket.on('ready', () => {
    ready = true;
});

socket.on('stop', () => {
    ready = false;
    document.body.style.background = 'white';
});

socket.on('data', data => {
    if (ready){
        document.body.style.background = `hsl(${data}, 50%, 50%)`;
    }
});

socket.on('people', nbr => {
    console.log(nbr);
});