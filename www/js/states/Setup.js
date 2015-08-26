var HachiBowl = HachiBowl || {};

HachiBowl.Title = function(){};

HachiBowl.Title.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = '#aaaaff';
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HACHICOM\nBOWLING", 36);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 218, 'start16', "[START]", 16);
    //this.startText.anchor.setTo(0.5,0);
    this.startText.inputEnabled = true;
    this.startText.events.onInputUp.add(this.startGame, this);
    
    this.configText = this.game.add.bitmapText(20, 258, 'start16', "[CONFIG]", 16);
    //this.configText.anchor.setTo(0.5,0);
    this.configText.inputEnabled = true;
    this.configText.events.onInputUp.add(this.startGame, this);
    
    this.creditText = this.game.add.bitmapText(20, 298, 'start16', "[CREDITS]", 16);
    //this.creditText.anchor.setTo(0.5,0);
    this.creditText.inputEnabled = true;
    this.creditText.events.onInputUp.add(this.startGame, this);
    
    this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start16', "© 2015 ADINAN BATISTA ALVES\n\n       HACHICOM SOFT", 10);
    this.copyrightText.anchor.setTo(0.5,0);
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.highscoreTimer = this.game.time.create(false);
    this.highscoreTimer.add(10000, this.showHighscore, this);
    this.highscoreTimer.start();
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    // }
  },
  
  startGame: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
  },
  
  showHighscore: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
  }
};
