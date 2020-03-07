const socket = io();

socket.on('message', (data) => {
    console.log(data);
});

document.querySelector('#message-form').addEventListener('submit' , (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        if(error){
            return console.log(error);
        }

        console.log('The message was delivered!');
    });
});

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        socket.emit('sendLocation', {
            latitude,
            longitude
        }, () => {
            console.log('Location shared!');
        });
    });
});
