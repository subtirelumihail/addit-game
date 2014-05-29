function Score(){
    this.scoreContainer = $('.score');
    this.bestScore = 0;
    this.bestScoreContainer = $('.bestscore');
    this.defscore = '00000000';

    //Set the score container
    this.scoreContainer.html(this.defscore);

    //Set The best score
    this.getBestScore();
}

Score.prototype.getBestScore = function(){
    this.bestScore = typeof(Storage)!=="undefined" ? parseInt(localStorage.getItem("bestscore")) : 0;
    this.bestScore = this.bestScore ? this.bestScore : 0;
}

Score.prototype.setBestScore = function(){
    if(score.bestScore<game.score){
        localStorage.setItem("bestscore", game.score);
        score.bestScore = game.score;
    }
    score.bestScoreContainer.html(score.bestScore);
}

Score.prototype.setScore = function(t, l){
    var kl='';
    t = t<=0 ? 1:t;
    game.score = Math.ceil(parseInt( ((t * l) / 2) + game.score )) + 1;

    var sLen = new String(game.score);
    var length = sLen.length;

    if(length > 8){
        game.score = '99999999';
        this.setBestScore();
        game.endGame(true, 500);
    }

    sLen = 8 - sLen.length;
    for(var i=0; i<sLen; i++){ kl = kl + '0'; }

    this.setBestScore();
    this.scoreContainer.html(kl+game.score);
}

var score = new Score();