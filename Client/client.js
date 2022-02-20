const Net = require('net');
const Port = 5000;
const Host = '127.0.0.1';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


class Client {

    constructor(port, address){
        this.socket = new Net.Socket();
        this.address = address || Host;
        this.port = port ||  Port;
        this.init();
    }

    init() {
        this.socket.connect(this.port, this.address,() => { 
            console.log(`Client connected to: ${this.address} : ${this.port}`); 
        }); 
        this.socket.on('close', ()=> {
            console.log('Client closed');
        })
    }

    postMessage(message) {
        return new Promise ((resolve, reject) => {
            this.socket.write(message);
            this.socket.on('data', (data)=> {
                resolve(data);
                if(data.toString('utf-8').endsWith('exit')) {
                    this.socket.destroy();
                }
            });
            this.socket.on('error', (err)=> {
                reject('err');
            });
            
        });
    }
    getMessage(data) {
        console.log(`${data}`);
    }

    answerUser() {
        return new Promise((resolve, reject) => {
            readline.question('Entrer votre choix : ', (input) => resolve(input) );
        });
    }
}

module.exports = Client;
