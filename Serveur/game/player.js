class Player {

    constructor(id) {
        this.id = id;
        this.choice = undefined;
        this.score = 0;
        this.status = false;
    }

    init(){}

    getId(){        return this.id;    }

    getScore() {        return this.score;    }
    changeScore(addScore){        this.score += addScore;    }

    getChoice(){return this.choice;}
    changeChoice(newChoice){        this.choice = newChoice;    }

    getStatus(){ return this.status;}
    changeStatus(newStatus){ this.status= newStatus;}
}

module.exports = Player