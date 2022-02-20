const Net = require('net');
const Port = 5000;
const Host = '127.0.0.1';
const Server = Net.createServer();
let sockets = [];

// Import the games
const game = require("./game");


// Open server to port and host
Server.listen(Port, Host, ()=> {
    console.log(`TCP server listening on ${Host}:${Port}`);
})

// Create connection
Server.on('connection', (socket) => { 
        
    sockets.push(socket); 

    //Select the game that you want to play here
    game.chifoumi.chifoumi(socket);
    
    socket.on('close', (data) => { 
        let index = sockets.findIndex((o) => { 
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort; 
        }) 
        if (index !== -1) sockets.splice(index, 1); 
            sockets.forEach((sock) => { 
            sock.write(`${clientAddress} disconnected\n`); 
        });

        console.log(`connection closed: ${clientAddress}`); 
    }); 
    
    socket.on('error', (err) => { 
        console.log(`Error occurred in ${clientAddress}: ${err.message}`); 
    }); 
}); 
