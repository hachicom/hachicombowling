var HachiBowl = HachiBowl || {};

HachiBowl.Tutorial = function(){};

HachiBowl.Tutorial.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = '#aaaaff';
    
    this.hero = this.game.rnd.integerInRange(0, 3);
    
    //track creation
    this.track = this.game.add.tileSprite(0, 0, 224, this.game.height-64, 'tracks', this.hero);
    //this.trackstart = this.game.add.tileSprite(0, this.game.height-64, 224, 64, 'trackstart', this.hero);
    
    this.portrait = this.game.add.sprite(224,0, 'playerface', this.hero);
        
    this.heroSpr = this.game.add.sprite(192, this.game.height-96, 'player', this.hero);
    this.heroSpr.anchor.setTo(0.5, 0.5);
    
    this.tilewin = 	[
          [-1,-1,-1,-1,-1,-1,-1,0,1,2],
          [-1,-1,-1,-1,-1,-1,-1,3,4,5],
          [-1,-1,-1,-1,-1,-1,-1,6,7,8],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [6,7,7,7,7,7,7,7,7,8],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,3,-1,-1],
        ];
        
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
    
    this.pageShow = 1;
    
    this.tutorialText = this.game.add.bitmapText(this.game.width, 200, 'start12', "", 12);
    this.tutorialText.align = 'left';
    this.tutorialText.setText(glossary.text.tutorialPg1[language]);
    //this.tutorialText.anchor.setTo(0.5,0);
    
    this.moveTween = this.game.add.tween(this.tutorialText);
    this.moveTween.to({x:10},2000,Phaser.Easing.Cubic.InOut);
    this.moveTween.start();
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.highscoreTimer = this.game.time.create(false);
    this.highscoreTimer.add(5000, this.changePage, this);
    this.highscoreTimer.start();
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
    }
  },
  
  changePage: function(){
    this.pageShow++;
    switch(this.pageShow){
      case 1: 
        this.tutorialText.setText(glossary.text.tutorialPg1[language]); 
        this.highscoreTimer.add(5000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 2: 
        this.tutorialText.setText(glossary.text.tutorialPg2[language]); 
        this.highscoreTimer.add(5000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 3: 
        this.tutorialText.setText(glossary.text.tutorialPg3[language]); 
        this.highscoreTimer.add(5000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 4: 
        this.tutorialText.setText(glossary.text.tutorialPg4[language]); 
        this.highscoreTimer.add(5000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 5: 
        this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore"); break;
    }
  }
};
