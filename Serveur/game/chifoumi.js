const Player = require('./player.js');
const Players = []
let compteur = 0;

exports.chifoumi = (socket) => {
    
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    console.log(`new client connected: ${clientAddress}`); 

    const count = Players.length;
    while (Players.length == count){
        Players.push(player= new Player(socket.remotePort));
    }

    socket.on('data', (data) => {
        indexPlayer= Number(getIndexPlayer(socket.remotePort));
        console.log(indexPlayer);

        switch (data.toString('utf-8')) {
            case 'chifoumi':
                indexPlayer= Number(getIndexPlayer(socket.remotePort));

                numberPlayer = indexPlayer +1;
                socket.write(`Bienvenue au jeu pierre, papier, ciseaux, \nPour jouer rien de plus simple, il vous suffit de saisir \n: Pierre(0) | Papier(1) | Ciseaux(2) | Quitter (exit) \nCe jeu joue entre 2 personnes \n Vous êtes le joueur ${numberPlayer}`);  
                break;
            case '0':
                Players[indexPlayer].choice = 'Pierre';
                Players[indexPlayer].status = true;
                getChoicePlayer(socket, numberPlayer, Players[indexPlayer].choice)
                break;
            case '1':
                Players[indexPlayer].choice = 'Papier';
                Players[indexPlayer].status = true;
                getChoicePlayer(socket, numberPlayer, Players[indexPlayer].choice)
                break;
            case '2':
                Players[indexPlayer].choice = 'Ciseaux';
                Players[indexPlayer].status = true;
                getChoicePlayer(socket, numberPlayer, Players[indexPlayer].choice)
                break;
            case 'result':
                console.log(Players)

                if(count==1 && Players[0].status &&  Players[1].status){

                    if (Players[0].choice == 'Valeur erronée' || Players[1].choice == 'Valeur erronée') {
                        return socket.write(`Une valeur erronée a été saisie pendant la durée du jeu`);

                    } else if ((Players[0].choice).localeCompare('Pierre')==0 && Players[1].choice == 'Ciseaux') {
                        return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné`);

                    } else if (Players[0].choice == 'Ciseaux' && Players[1].choice == 'Papier') {
                        return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné`);

                    } else if ((Players[0].choice).localeCompare('Papier') ==0  && (Players[1].choice).localeCompare('Pierre')==0 ){
                        return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné`);

                    } else if (Players[0].choice == Players[1].choice) {
                        return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} Egalité`);
                    }
                    else {
                        socket.write(`Le joueur ${Players.indexOf(Players[1]) + 1}, vous avez gagné.`);
                    }
                }
                break
            default:
                socket.write(`Default : Valeur erronée` );
                break;
        }
    }); 
}

function getChoicePlayer(socket,numberPlayer, choice){
    socket.write(`Joueur ${numberPlayer}, vous avez choisi : ${choice} `);
    
}
function getIndexPlayer(IdClient) {
    const player = Object.keys(Players);
    for (key of player){
        if(Players[key].id === IdClient){
            return key;
        };
    };
}



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

