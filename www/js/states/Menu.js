var HachiBowl = HachiBowl || {};

HachiBowl.Menu = function(){};

HachiBowl.Menu.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.tilewin = 	[
          [-1,0,1,1,1,1,1,1,2,-1],
          [-1,6,7,7,7,7,7,7,8,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,0,1,2,5],
          [3,4,4,4,4,4,3,4,5,5],
          [3,4,4,4,4,4,6,7,8,5],
          [6,7,7,7,7,7,7,7,7,8],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [0,1,1,1,2,0,1,1,1,2],
          [6,7,7,7,8,6,7,7,7,8],
        ];
        
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
    
    this.game.stage.backgroundColor = '#aaaaff';
    // tempVars
    this.bgmval = 'bgm1';
    this.heroval = 0;
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start16', glossary.UI.menuTitle[language], 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 104, 'start12', glossary.UI.menuTxt[language], 12);
    // this.startText.anchor.setTo(0.5,0);
    
    // BUTTONS FOR MUSIC SELECTION
    this.bgmCursor = this.game.add.sprite(80, 138, 'cursor');
    this.bgmCursor.anchor.setTo(0.5,0);
    //if(sfxOn===false) this.sfxCursor.x = 240;
    
    this.bgmOneText = this.game.add.bitmapText(60, 130, 'start16', "[BGM1]", 16);
    this.bgmOneText.anchor.setTo(0.5,0.5);
    this.bgmOneText.inputEnabled = true;
    this.bgmOneText.events.onInputUp.add(function(){
      this.bgmval = 'bgm1';
      this.bgmCursor.x = 60;
    },this);
    
    this.bgmTwoText = this.game.add.bitmapText(168, 130, 'start16', "[BGM2]", 16);
    this.bgmTwoText.anchor.setTo(0.5,0.5);
    this.bgmTwoText.inputEnabled = true;
    this.bgmTwoText.events.onInputUp.add(function(){
      this.bgmval = 'bgm2';
      this.bgmCursor.x = 160;
    },this);
    
    this.bgmOffText = this.game.add.bitmapText(270, 130, 'start16', "[OFF]", 16);
    this.bgmOffText.anchor.setTo(0.5,0.5);
    this.bgmOffText.inputEnabled = true;
    this.bgmOffText.events.onInputUp.add(function(){
      this.bgmval = '';
      this.bgmCursor.x = 260;
    },this);
    
    // BUTTONS FOR CHARACTER SELECTION
    this.charCursor = this.game.add.sprite(80, 230, 'cursor');
    this.charCursor.anchor.setTo(0.5,0);
    //if(language==='en_US') this.charCursor.x = 240;
    
    this.hachiText = this.game.add.bitmapText(20, 230, 'start16', "[HACHI]", 16);
    this.hachiText.anchor.setTo(0,0.5);
    this.hachiText.inputEnabled = true;
    this.hachiText.events.onInputUp.add(function(){
      this.heroval = 0;
      this.charCursor.x = 80;
      this.charCursor.y = 230;
    },this);
    
    this.pepitoText = this.game.add.bitmapText(20, 260, 'start16', "[PEPITO]", 16);
    this.pepitoText.anchor.setTo(0,0.5);
    this.pepitoText.inputEnabled = true;
    this.pepitoText.events.onInputUp.add(function(){
      this.heroval = 1;
      this.charCursor.x = 80;
      this.charCursor.y = 260;
    },this);
    
    this.nickyText = this.game.add.bitmapText(20, 290, 'start16', "[NICKY]", 16);
    this.nickyText.anchor.setTo(0,0.5);
    this.nickyText.inputEnabled = true;
    this.nickyText.events.onInputUp.add(function(){
      this.heroval = 2;
      this.charCursor.x = 80;
      this.charCursor.y = 290;
    },this);
    
    this.punkText = this.game.add.bitmapText(20, 320, 'start16', "[PUNK]", 16);
    this.punkText.anchor.setTo(0,0.5);
    this.punkText.inputEnabled = true;
    this.punkText.events.onInputUp.add(function(){
      this.heroval = 3;
      this.charCursor.x = 80;
      this.charCursor.y = 320;
    },this);
        
    // BUTTONS FOR EXIT/SAVE
    this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.voltar[language], 16);
    this.backText.anchor.setTo(0.5,0.5);
    this.backText.inputEnabled = true;
    this.backText.events.onInputUp.add(this.goBack, this);
    
    this.playText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.jogar[language], 16);
    this.playText.anchor.setTo(0.5,0.5);
    this.playText.inputEnabled = true;
    this.playText.events.onInputUp.add(this.playGame, this);
    
    // BRING CURSORS TO TOP
    this.bgmCursor.bringToTop();
    this.charCursor.bringToTop();
    
    // this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start16', "© 2015 ADINAN BATISTA ALVES\n\n       HACHICOM SOFT", 10);
    // this.copyrightText.anchor.setTo(0.5,0);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    // }
  },
  
  goBack: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
  },
  
  playGame: function(){
    currentBGM = this.bgmval;
    currentHero = this.heroval;
    
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
  }
};