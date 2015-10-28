var HachiBowl = HachiBowl || {};

HachiBowl.Title = function(){};

HachiBowl.Title.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = bgcolor1;
    
    // this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    // this.bgimg.autoScroll(10, 20);
    
    // this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', "HACHICOM\nBOWLING", 36);
    // this.titleMessage.align = 'center';
    // this.titleMessage.anchor.setTo(0.5,0);
    
    this.titleMessage = this.game.add.sprite(this.game.world.centerX, 20, 'titlelogo');
    this.titleMessage.anchor.setTo(0.5,0);
    this.titleMessage.alpha = 0;
    this.fadeTween = this.game.add.tween(this.titleMessage);
    this.fadeTween.to({alpha:1},2000,Phaser.Easing.Linear.NONE);
    this.fadeTween.start();
    
    this.character1 = this.game.add.sprite(200, 158, 'playerwin', 1);
    this.character1 = this.game.add.sprite(230, 228, 'playerwin', 2);
    this.character1 = this.game.add.sprite(180, 238, 'playerwin', 3);
    this.character1 = this.game.add.sprite(220, 298, 'playerwin', 0);
    
    this.startTextA = this.game.add.bitmapText(20, 178, 'start16', glossary.UI.startA[language], 16);
    //this.startTextA.anchor.setTo(0.5,0);
    this.startRectA = new Phaser.Rectangle(this.startTextA.x-10,this.startTextA.y-10,200,this.startTextA.height + 20);
    
    this.startTextB = this.game.add.bitmapText(20, 218, 'start16', glossary.UI.startB[language], 16);
    //this.startTextB.anchor.setTo(0.5,0);
    this.startRectB = new Phaser.Rectangle(this.startTextB.x-10,this.startTextB.y-10,200,this.startTextB.height + 20);
    
    this.configText = this.game.add.bitmapText(20, 258, 'start16', glossary.UI.settings[language], 16);
    //this.configText.anchor.setTo(0.5,0);
    this.configRect = new Phaser.Rectangle(this.configText.x-10,this.configText.y-10,200,this.configText.height + 20);
    
    this.hiscoreText = this.game.add.bitmapText(20, 298, 'start16', "[HISCORE]", 16);
    //this.hiscoreText.anchor.setTo(0.5,0);
    this.hiscoreRect = new Phaser.Rectangle(this.hiscoreText.x-10,this.hiscoreText.y-10,200,this.hiscoreText.height + 20);
    
    this.creditText = this.game.add.bitmapText(20, 338, 'start16', glossary.UI.credits[language], 16);
    //this.creditText.anchor.setTo(0.5,0);
    this.creditRect = new Phaser.Rectangle(this.creditText.x-10,this.creditText.y-10,200,this.creditText.height + 20);
    
    this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start12', "© 2015 ADINAN B. ALVES\n\n       HACHICOM SOFT", 12);
    this.copyrightText.anchor.setTo(0.5,0);
    
    // READ USER INPUT    
    this.game.input.onDown.add(this.handlePointerDown,this);
    
    /*****************************
     ******** GAME SOUNDS ********
     *****************************/
    this.selectSound = this.game.add.audio('select');
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.demoTimer = this.game.time.create(false);
    this.demoTimer.add(5000, this.showTutorial, this);
    this.demoTimer.start();
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.demoTimer.stop(false);
      this.demoTimer.start();
    }
  },
  
  /* render: function(){
    this.game.debug.geom( this.startRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.configRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.creditRect, 'rgba(0,255,255,0.4)' ) ;
  }, */
  
  handlePointerDown: function(pointer) {
    var startpressA = this.startRectA.contains(pointer.x,pointer.y);
    var startpressB = this.startRectB.contains(pointer.x,pointer.y);
    var configpress = this.configRect.contains(pointer.x,pointer.y);
    var hiscorePress = this.hiscoreRect.contains(pointer.x,pointer.y);
    var creditpress = this.creditRect.contains(pointer.x,pointer.y);
    //alert(startpressA);
    if(startpressA===true) {
      if(sfxOn===true){
        this.selectSound.play();
      }
      this.startGameA();
    }
    if(startpressB===true) {
      if(sfxOn===true){
        this.selectSound.play();
      }
      this.startGameB();
    }
    else if(configpress===true) {
      if(sfxOn===true){
        this.selectSound.play();
      }
      this.showSettings();
    }
    else if(hiscorePress===true) {
      if(sfxOn===true){
        this.selectSound.play();
      }
      this.showHighscore();
    }
    else if(creditpress===true) {
      if(sfxOn===true){
        this.selectSound.play();
      }
      this.showCredits();
    }
  },
  
  startGameA: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Menu",['A']);
  },
  
  startGameB: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Menu",['B']);
  },
  
  showSettings: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Setup");
  },
  
  showCredits: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Credits");
  },
  
  showHighscore: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
  },
  
  showTutorial: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Tutorial");
  }
};
