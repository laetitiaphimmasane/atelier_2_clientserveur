const Client = require('./client.js');
const gameInProgress = new Client(); 

/*
* postMessage  -> post the message to the server 
* getMessage   -> get the message to the server
* answerUser    -> get the answer of the user
*/

gameInProgress.postMessage('Chifoumi'.toLowerCase())
    .then((data) => { 
        gameInProgress.getMessage(data);
        return gameInProgress.answerUser()
    })
    .then((data)=>{
        return gameInProgress.postMessage(data);
    })
    .then((data) => {
        gameInProgress.getMessage(data);
        return gameInProgress.postMessage('result'.toLowerCase());
    })
    .then((data) => {
        gameInProgress.getMessage(data)
    //    return gameInProgress.postMessage('exit'.toLowerCase());
    })
    .catch((err) => console.error(err));  
   

