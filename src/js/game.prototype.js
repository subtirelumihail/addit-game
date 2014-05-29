
function Game(){
    console.log('This has started');

    this.title = 'Addit';
    this.score = 0;
    this.lvlCounter = 0;
    this.level = 1;
    this.maxperlevel = 4;
    this.reset = true;
    this.prevNr = 0;

    this.view();
    this.guessnumberStart();
}

Game.prototype.view = function(){
    this.box         = $('li.item');
    this.container   = $('ul.game');
    this.overlayer   = $('.overlayer');
    this.help        = $('#help');
    this.guessnumber = $('.guessnumber span');
    this.body        = $('body');

    this.buttons();
}

Game.prototype.buttons = function(){
    this.newgamebtn = $('.newgame');
    this.helpbtn    = $('.howtoplay, .close');
    this.buttonsEvents();
}

Game.prototype.buttonsEvents = function(){
    var elem = this;
    this.newgamebtn.click(function(){  elem.newGameEvent(); });
    this.helpbtn.click(function(){   elem.helpModal(); });
    this.body.on('mouseout','li.item.selected:not(.canDelete)',function(){ elem.body.addClass('canDelete');  });
}

Game.prototype.helpModal = function(){
    if(!this.help.hasClass('opened'))
    {
      this.help.addClass('opened').fadeIn('slow');
      clearTimeout(timer.timeout);
    }else{
        this.help.removeClass('opened').fadeOut('slow');
        setTimeout(function(){timer.timeStart();}, 1000);
    }
}

Game.prototype.newGameEvent = function(){
    this.help.removeClass('opened').fadeOut('slow');
    if(!this.body.hasClass('new'))
    {
      this.body.addClass('new');
      game.endGame(true, 10);
    }
}

//Game functions
Game.prototype.endGame = function(r, t){
        var timeout = t;
        var c = this;

        this.box = $('li.item');

        timer.resetTimer();

        if(r) this.resetScore();
        
        c.overlayer.show();
            setTimeout(function(){c.box.removeClass('xxx fail canDelete selected'); },timeout);
             setTimeout(function(){c.box.addClass('hidden'); },timeout=timeout+200);
                setTimeout(function(){c.overlayer.hide(); var RelaunchApp = new App(); c.body.removeClass('new');},timeout+300);
}

Game.prototype.resetScore = function(){
    this.score = 0;
    this.level = 1;
    this.lvlCounter = 0;
    score.scoreContainer.html(score.defscore);
}

Game.prototype.validate = function(sel){
        this.sel = sel;
        if(this.sel.length == 3){
           clearTimeout(timer.timeout);

           var sum = this.getSum();
           var top = parseInt( this.guessnumber.numberAnimate('val') );
           
           this.setStatus(sum, top);

           this.levelSet();
            
           this.endGame(this.reset, 1000);       
        }
}

Game.prototype.guessnumberStart = function(){
    //Guess number
    this.guessnumber.html(this.getRandomInt(10, 90));
    this.guessnumber.numberAnimate();
}

Game.prototype.getSum = function(){
    var sum = 0;
    
    this.sel.each(function(){
        sum = sum + parseInt($(this).html());
    });

    return sum;
}

Game.prototype.check = function(){
    return (this.topNr!=this.sumAll || timer.time < 0) ? false : true;
}

Game.prototype.setStatus = function(sum, top){
    this.sumAll = sum;
    this.topNr = top;

    if(this.check())
        this.success();
    else
        this.fail();
}

Game.prototype.success = function(){
    this.reset = false;
    this.sel.addClass('success');
    score.setScore(timer.time,this.level);
}

Game.prototype.fail = function(){
     this.reset = true;
     if(this.topNr != this.sumAll)
         this.sel.addClass('fail');
}

Game.prototype.levelSet = function(){
    if(this.lvlCounter == this.maxperlevel){
        this.lvlCounter = 0;
        this.level = this.level + 1;
    }else{
        this.lvlCounter++;
    }
}

Game.prototype.genArray = function(level, arr){
    var nr;
   
    var min = ( (level - 1) * 2 ) + 1;
    var max = ( level * 12);
    
    do{
        nr = this.getRandomInt (min, max) ;
    }while(arr.indexOf(nr) > -1)

    return nr;
}

Game.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var game = new Game();