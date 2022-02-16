const Net = require('net');
const port = 5000;
let Players = [{    Player: 1,    Score:0},
    {Player: 2,    Score:0 }
];

const server = new Net.Server();
server.listen(port, function() {
    console.log("Server listening for connection requests on socket localhost:"+port);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    socket.write(`Joueur  ${Players[0].Player}, à votre tour !`);

// The server can also receive data from the client by reading from its socket.
    socket.on('data', function(data) {
        console.log("Data received from client: " + data );

        //Players.push(data);
        //console.log(Players[0].toString('utf-8'));

        switch (data.toString('utf-8')) {
            case '0':
                console.log("Pierre");
                break;
            case '1':
                console.log("Papier");
                break;
            case '2':
                console.log("Ciseaux");
                break;
            default:
                console.log("wsh");
        }

    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });


    socket.on('error', function(err) {
        console.log(err);
    });

});


/**
 * Joueur :
 * - numéro du joueur
 * - score
 * - main
 *
 *
 * Jeu :
 * - fonction compare des mains entre les deux joueurs
 * - fonction joueur gagnant => incrémente son score
 * + fonction round
 * **/

function play(){

}