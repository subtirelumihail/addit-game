function Timer(){
    this.deftime = 45,
    this.time = this.deftime;
    this.circle = $('.dial');
    this.circlePrecent = 100;
    this.timeout = false;

    //Set up timer
    this.setUpTimer();
}

Timer.prototype.setUpTimer = function(){
    this.container = $('.time span');
   
    //Generate random number for the numberAnimate to take effect on app start
    this.container.html(game.getRandomInt (10, this.deftime));
    this.container.numberAnimate();

    this.circle.knob({
        width:15,
        displayInput:false,
        thickness: 1,
        readOnly: true,
        fgColor: '#FFFFFF',
        bgColor: '#f38630',
        rotation:'anticlockwise'
    });
}

Timer.prototype.timeStart = function(){
    this.container.numberAnimate('set', this.time--);
    if(this.time  >= 0){
        var t =  this;

        t.circle.val(t.circlePrecent).trigger('change');
        t.circlePrecent = t.circlePrecent - (100 / t.deftime);
        t.timeout = setTimeout(function(){ t.timeStart(); },1000);
        
    }else{
       this.circle.val(0).trigger('change');
       game.reset = 0;
       game.endGame(true, 500);
    }
}

Timer.prototype.resetTimer = function(){
    clearTimeout(this.timeout);
    this.time=this.deftime;
    this.circlePrecent=100;
}

var timer = new Timer();