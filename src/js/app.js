// /localStorage.setItem("bestscore", 0);
var Box = Backbone.Model.extend({
	initialize : function() {
        this.number = 'number'
    },

    defaults:{
        selected: false
    },

    toggle: function(){
         var sel = $('li.item.selected');
         if(sel.length < 3)
            this.set('selected', !this.get('selected'));
        
     }
});

var Boxes = Backbone.Collection.extend({
    model: Box
});

var BoxView = Backbone.View.extend({
    tagName: 'li',  
    
    className: "notselectable item ",

    events:{
        'click': 'selecToggle'
    },

    initialize: function(){ 
        this.listenTo(this.model, 'change ', this.changestatus);
       
    },

    render: function(){
        var selected = this.model.get('selected') ? 'selected':"";

        this.$el.append(this.model.get('number'));

        var elem = this.$el;
            setTimeout(function(){elem.addClass('shown');},100);
                setTimeout(function(){elem.addClass('xxx');},1000);

        return this;
    },

    changestatus: function(){
        var elem = $(this.$el);

        if(this.model.get('selected')){
            elem.addClass('selected');
                this.temptimeout = setTimeout(function(){elem.addClass('canDelete');},100);
        }
        else{
            clearTimeout(this.temptimeout);
            elem.removeClass('selected canDelete');
        }
    },

    selecToggle: function(){
         this.model.toggle();
         game.validate($('li.item.selected'));
    }
});

var App = Backbone.View.extend({
    el:  $('.wrapper'),

    initialize: function(){
         _.bindAll(this, 'render');
        this.render();
    },

    render: function(){
            this.genNumber();
            
            //if game needs to be reseted
            if(game.reset) game.resetScore();

            //Clear board
            game.container.html('');

            //Gen numbers
            this.setNumbers();

            //Set top number for matching
            this.setTopNumber();
            
            //Append the best score
            score.setBestScore();

            //Start timer
            clearTimeout(timer.timeout);
            timer.timeStart();
         return this;
    },

    genNumber: function(){
        var x, y;

        this.numbers = new Boxes();
        this.nrArray = [];
        
        for(var i=1; i<=9; i++){
            y = game.genArray(game.level, this.nrArray);
            x = new Box({
                number:  y
            });
            this.nrArray[i] = y;
            this.numbers.add(x);
        } 
    },

    setNumbers: function(){
        //Render the board with numbers
        this.numbers.each(function(p){
           var bx = new BoxView({model: p})
           game.container.append(bx.render().el);
        }, this);       
    },

    setTopNumber: function(){
        game.guessnumber.numberAnimate('set', this.getShuffle());
    },

    getShuffle: function(){
        var shuffle;

        do{
         shuffle = _.sample(this.nrArray, 3);
         var sum = _.reduce(shuffle, function(memo, num){ return memo + num; }, 0); //Sum the random numbers to get the guess number
        }while(sum == game.prevNr || sum < 10)
        
        console.log(shuffle);   //Show numbers
        
        return game.prevNr = sum;
    }
});

var LaunchApp = new App();

