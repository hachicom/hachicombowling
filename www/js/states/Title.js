var HachiBowl = HachiBowl || {};

HachiBowl.Title = function(){};

HachiBowl.Title.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = '#aaaaff';
    
    // this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HACHICOM\nBOWLING", 36);
    // this.titleMessage.align = 'center';
    // this.titleMessage.anchor.setTo(0.5,0);
    
    this.titleMessage = this.game.add.sprite(this.game.world.centerX, 20, 'titlelogo');
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 218, 'start16', glossary.UI.start[language], 16);
    //this.startText.anchor.setTo(0.5,0);
    this.startRect = new Phaser.Rectangle(this.startText.x-10,this.startText.y-10,200,this.startText.height + 20);
    
    this.configText = this.game.add.bitmapText(20, 258, 'start16', glossary.UI.settings[language], 16);
    //this.configText.anchor.setTo(0.5,0);
    this.configRect = new Phaser.Rectangle(this.configText.x-10,this.configText.y-10,200,this.configText.height + 20);
    
    this.creditText = this.game.add.bitmapText(20, 298, 'start16', glossary.UI.credits[language], 16);
    //this.creditText.anchor.setTo(0.5,0);
    this.creditRect = new Phaser.Rectangle(this.creditText.x-10,this.creditText.y-10,200,this.creditText.height + 20);
    
    this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start12', "© 2015 ADINAN B. ALVES\n\n       HACHICOM SOFT", 12);
    this.copyrightText.anchor.setTo(0.5,0);
    
    // READ USER INPUT    
    this.game.input.onDown.add(this.handlePointerDown,this);
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.highscoreTimer = this.game.time.create(false);
    this.highscoreTimer.add(10000, this.showHighscore, this);
    this.highscoreTimer.start();
  },
  
  /* update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    }
  }, */
  
  /* render: function(){
    this.game.debug.geom( this.startRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.configRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.creditRect, 'rgba(0,255,255,0.4)' ) ;
  }, */
  
  handlePointerDown: function(pointer) {
    var startpress = this.startRect.contains(pointer.x,pointer.y);
    var configpress = this.configRect.contains(pointer.x,pointer.y);
    var creditpress = this.creditRect.contains(pointer.x,pointer.y);
    //alert(startpress);
    if(startpress===true) this.startGame();
    else if(configpress===true) this.showSettings();
    else if(creditpress===true) this.showCredits();
  },
  
  startGame: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Menu");
  },
  
  showSettings: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Setup");
  },
  
  showCredits: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Credits");
  },
  
  showHighscore: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
  }
};
