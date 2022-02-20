const Players = [
    {    
        id : undefined,
        Score: 0,
        Choice: "",
        Finish : false,
        Status: false,
    },
    {
        id : undefined,
        Score: 0,
        Choice: "",
        Finish : false,
        Status: false,
    }
];
let idPlayer = undefined;
let numberPlayer = undefined;

exports.chifoumi = (socket) => {
    
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`; 
    console.log(`new client connected: ${clientAddress}`); 
    
    socket.on('data', (data) => { 
        console.log(`Client ${clientAddress}: ${data}`);
        console.log(socket.remotePort);
        idPlayer= Number(getIdPlayer(socket.remotePort)); 
        console.log(idPlayer);

        switch (data.toString('utf-8')) {
            case 'chifoumi':
                idPlayer= Number(getIdPlayer(socket.remotePort)); 
                numberPlayer = idPlayer +1;
                socket.write(`Bienvenue au jeu pierre, papier, ciseaux, \nPour jouer rien de plus simple, il vous suffit de saisir \n: Pierre(0) | Papier(1) | Ciseaux(2) | Quitter (exit) \nCe jeu joue entre 2 personnes \n Vous êtes le joueur ${numberPlayer}`);  
                break;
            case '0':
                Players[idPlayer].Choice = 'Pierre';
                Players[idPlayer].Finish = true;
                getChoicePlayer (socket, numberPlayer, Players[idPlayer].Choice)
                break;
            case '1':
                Players[idPlayer].Choice = 'Papier';
                Players[idPlayer].Finish = true;
                getChoicePlayer (socket, numberPlayer, Players[idPlayer].Choice)
                break;
            case '2':
                Players[idPlayer].Choice = 'Ciseaux';
                Players[idPlayer].Finish = true;
                getChoicePlayer (socket, numberPlayer, Players[idPlayer].Choice)
                break;
            case 'result':
                while (!Players[0].Finish && !Players[1].Finish ) {
                    
                }
                if (Players[0].Choice == 'Valeur erronée' || Players[1].Choice == 'Valeur erronée') {
                    return socket.write(`Une valeur erronée a été saisie pendant la durée du jeu` );
                } else if (Players[0].Choice == 'Pierre' && Players[1].Choice == 'Ciseaux'){
                    return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné` );
                } else if (Players[0].Choice == 'Ciseaux' && Players[1].Choice == 'Papier') {
                    return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné` );
                } else if (Players[0].Choice == 'Papier' && Players[1].Choice == 'Pierre') {
                    return socket.write(`Joueur ${Players.indexOf(Players[0]) + 1} vous avez gagné` );
                } else { 
                    socket.write(`Joueur ${Players.indexOf(Players[1]) + 1} vous avez gagné` );
                }
            break;
            default:
                socket.write(`Valeur erronée` );
                break;
        }
    }); 
}

function getChoicePlayer(socket,numberPlayer, choice){
    socket.write(`Joueur ${numberPlayer}, vous avez choisi : ${choice} `);
    
}
function getIdPlayer(IdClient) {
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

