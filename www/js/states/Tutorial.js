var HachiBowl = HachiBowl || {};

HachiBowl.Tutorial = function(){};

HachiBowl.Tutorial.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.bgimg.autoScroll(10, 20);
    
    this.game.stage.backgroundColor = bgcolor2;
    this.cursorspeed = 185;
    this.maxlimit = 70;
    
    this.hero = this.game.rnd.integerInRange(0, 3);
    
    //track creation
    this.track = this.game.add.tileSprite(0, 0, 224, this.game.height-128, 'tracks', this.hero);
    this.trackstart = this.game.add.tileSprite(0, this.game.height-128, 224, 128, 'trackstart', this.hero);
    
    this.portrait = this.game.add.sprite(224,0, 'playerface', this.hero);
        
    this.ballSpr = this.game.add.sprite(192, this.game.height-128, 'ball', this.hero);
    this.ballSpr.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.ballSpr, Phaser.Physics.ARCADE);
    this.heroSpr = this.game.add.sprite(192, this.game.height-96, 'player', this.hero);
    this.heroSpr.anchor.setTo(0.5, 0.5);
    this.barSpr = this.game.add.sprite(112, 100, 'barmeter');
    this.barSpr.anchor.setTo(0.5, 0.5);
    this.barSpr.visible = false;
    this.cursorSpr = this.game.add.sprite(this.barSpr.x+40, this.barSpr.y, 'cursor');
    this.cursorSpr.anchor.setTo(0.5, 0);
    this.cursorSpr.visible = false;
    this.game.physics.enable(this.cursorSpr, Phaser.Physics.ARCADE);
    this.cursorSpr.body.velocity.x=0;
    this.leftButton = this.game.add.sprite(64, this.ballSpr.y - 80, 'arrow');
    this.leftButton.anchor.setTo(0.5,0.5);
    this.leftButton.visible = false;
    this.rightButton = this.game.add.sprite(160, this.ballSpr.y - 80, 'arrow');
    this.rightButton.anchor.setTo(0.5,0.5);
    this.rightButton.scale.x = -1; 
    this.rightButton.visible = false;
    this.finger = this.game.add.sprite(this.heroSpr.x, this.heroSpr.y, 'finger', 1);
    
    this.tilewin = 	[
          [-1,-1,-1,-1,-1,-1,-1,9,10,11],
          [-1,-1,-1,-1,-1,-1,-1,12,13,14],
          [-1,-1,-1,-1,-1,-1,-1,15,16,17],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [6,7,7,7,7,7,7,7,7,8],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
          [-1,-1,-1,-1,-1,-1,-1,12,-1,-1],
        ];
        
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
    
    this.pageShow = 1;
    
    this.tutorialText = this.game.add.bitmapText(this.game.width, 200, 'start12', "", 12);
    this.tutorialText.align = 'left';
    this.tutorialText.maxWidth = 300;
    this.tutorialText.setText(glossary.text.tutorialPg1[language]);
    //this.tutorialText.anchor.setTo(0.5,0);
    
    this.moveTween = this.game.add.tween(this.tutorialText);
    this.moveTween.to({x:10},2000,Phaser.Easing.Cubic.InOut);
    this.moveTween.start();
    
    /****************************
     ********** TIMERS **********
     ****************************/
    this.highscoreTimer = this.game.time.create(false);
    this.highscoreTimer.add(8000, this.changePage, this);
    this.highscoreTimer.start();
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
    }
    switch(this.pageShow){
      case 1: 
        this.ballSpr.x -= 0.25; this.heroSpr.x -= 0.25; this.finger.x = this.heroSpr.x; break;
      case 2: 
        if(this.cursorSpr.x<this.barSpr.x-this.maxlimit) {
          this.cursorSpr.x = this.barSpr.x-this.maxlimit;
          this.cursorSpr.body.velocity.x = this.cursorspeed;
        }
        else if(this.cursorSpr.x>this.barSpr.x+this.maxlimit) {
          this.cursorSpr.x = this.barSpr.x+this.maxlimit;
          this.cursorSpr.body.velocity.x = -this.cursorspeed;
        }
        break;
    }
    //if(this.ballSpr.x <= 112) {this.ballSpr.x = 112; this.heroSpr.x = 112;}
    
    if(this.ballSpr.y <= 192) {
      this.ballSpr.body.velocity.x += 8;
      this.finger.x = this.rightButton.x;
      this.finger.y = this.rightButton.y;
      this.finger.frame = 1;
    }
  },
  
  changePage: function(){
    this.pageShow++;
    switch(this.pageShow){
      case 1: 
        this.tutorialText.setText(glossary.text.tutorialPg1[language]); 
        this.highscoreTimer.add(8000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 2: 
        this.tutorialText.setText(glossary.text.tutorialPg2[language]); 
        this.highscoreTimer.add(6000, this.changePage, this); 
        this.highscoreTimer.start(); 
        this.barSpr.visible = true; this.cursorSpr.visible = true;
        this.cursorSpr.body.velocity.x = this.cursorspeed;
        this.finger.frame = 0;
        break;
      case 3: 
        this.finger.y -= 80;
        this.finger.frame = 1;
        this.tutorialText.setText(glossary.text.tutorialPg3[language]); 
        this.highscoreTimer.add(7000, this.changePage, this); 
        this.highscoreTimer.start(); 
        var ballVelo = (this.cursorSpr.x - this.barSpr.x);
        if(ballVelo>=-8 && ballVelo<=8) ballVelo = 0;
        this.cursorSpr.body.velocity.x = 0;
        this.ballSpr.body.velocity.x = ballVelo;
        this.ballSpr.body.velocity.y = -300;
        this.leftButton.visible = true;
        this.rightButton.visible = true;
        break;
      case 4: 
        this.tutorialText.setText(glossary.text.tutorialPg4[language]); 
        this.highscoreTimer.add(10000, this.changePage, this); 
        this.highscoreTimer.start(); break;
      case 5: 
        this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore"); break;
    }
  }
};
