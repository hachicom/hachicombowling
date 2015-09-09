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
          [3,4,4,4,4,4,0,1,2,5],
          [3,4,4,4,4,4,3,4,5,5],
          [3,4,4,4,4,4,6,7,8,5],
          [3,4,4,4,4,4,4,4,4,5],
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
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', glossary.UI.menuTitle[language], 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 104, 'start12', glossary.UI.menuTxt[language], 12);
    // this.startText.anchor.setTo(0.5,0);
    
    // BUTTONS FOR MUSIC SELECTION
    this.bgmCursor = this.game.add.sprite(80, 138, 'cursor');
    this.bgmCursor.anchor.setTo(0.5,0);
    
    this.bgmOneText = this.game.add.bitmapText(60, 130, 'start16', "[BGM1]", 16);
    this.bgmOneText.anchor.setTo(0.5,0.5);
    this.bgmOneRect = new Phaser.Rectangle(10,120,100,40);
    
    this.bgmTwoText = this.game.add.bitmapText(168, 130, 'start16', "[BGM2]", 16);
    this.bgmTwoText.anchor.setTo(0.5,0.5);
    this.bgmTwoRect = new Phaser.Rectangle(116,120,100,40);
    
    this.bgmOffText = this.game.add.bitmapText(270, 130, 'start16', "[OFF]", 16);
    this.bgmOffText.anchor.setTo(0.5,0.5);
    this.bgmOffRect = new Phaser.Rectangle(220,120,100,40);
    
    // BUTTONS FOR CHARACTER SELECTION
    this.charCursor = this.game.add.sprite(80, 208, 'cursor');
    this.charCursor.anchor.setTo(0.5,0);
    
    this.hachiText = this.game.add.bitmapText(20, 200, 'start16', "[HACHI]", 16);
    this.hachiText.anchor.setTo(0,0.5);
    this.hachiRect = new Phaser.Rectangle(20,190,160,40);
    
    this.pepitoText = this.game.add.bitmapText(20, 240, 'start16', "[PEPITO]", 16);
    this.pepitoText.anchor.setTo(0,0.5);
    this.pepitoRect = new Phaser.Rectangle(20,230,160,40);
    
    this.nickyText = this.game.add.bitmapText(20, 280, 'start16', "[NICKY]", 16);
    this.nickyText.anchor.setTo(0,0.5);
    this.nickyRect = new Phaser.Rectangle(20,270,160,40);
    
    this.punkText = this.game.add.bitmapText(20, 320, 'start16', "[PUNK]", 16);
    this.punkText.anchor.setTo(0,0.5);
    this.punkRect = new Phaser.Rectangle(20,310,160,40);
        
    // BUTTONS FOR EXIT/SAVE
    this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.voltar[language], 16);
    this.backText.anchor.setTo(0.5,0.5);
    this.backRect = new Phaser.Rectangle(0,384,160,64);
    
    this.playText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.jogar[language], 16);
    this.playText.anchor.setTo(0.5,0.5);
    this.playRect = new Phaser.Rectangle(160,384,160,64);
    
    // BRING CURSORS TO TOP
    this.bgmCursor.bringToTop();
    this.charCursor.bringToTop();
    
    // READ USER INPUT    
    this.game.input.onDown.add(this.handlePointerDown,this);
    
    // this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start16', "© 2015 ADINAN BATISTA ALVES\n\n       HACHICOM SOFT", 10);
    // this.copyrightText.anchor.setTo(0.5,0);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    // }
  },
  
  /* render: function(){
    this.game.debug.geom( this.bgmOneRect, 'rgba(0,255,255,0.4)' ) ;
    this.game.debug.geom( this.bgmTwoRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.bgmOffRect, 'rgba(255,0,255,0.4)' ) ;
    
    this.game.debug.geom( this.hachiRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.pepitoRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.nickyRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.punkRect, 'rgba(255,0,255,0.4)' ) ;
    
    this.game.debug.geom( this.backRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.playRect, 'rgba(255,0,255,0.4)' ) ;
  }, */
  
  handlePointerDown: function(pointer) {
    if(this.bgmOneRect.contains(pointer.x,pointer.y)){this.bgmval = 'bgm1'; this.bgmCursor.x = 60;}
    if(this.bgmTwoRect.contains(pointer.x,pointer.y)){this.bgmval = 'bgm2'; this.bgmCursor.x = 160;}
    if(this.bgmOffRect.contains(pointer.x,pointer.y)){this.bgmval = ''; this.bgmCursor.x = 260;}
    
    if(this.hachiRect.contains(pointer.x,pointer.y)){this.heroval = 0; this.charCursor.x = 80; this.charCursor.y = 208;}
    if(this.pepitoRect.contains(pointer.x,pointer.y)){this.heroval = 1; this.charCursor.x = 80; this.charCursor.y = 248;}
    if(this.nickyRect.contains(pointer.x,pointer.y)){this.heroval = 2; this.charCursor.x = 80; this.charCursor.y = 288;}
    if(this.punkRect.contains(pointer.x,pointer.y)){this.heroval = 3; this.charCursor.x = 80; this.charCursor.y = 328;}
    
    var backpress = this.backRect.contains(pointer.x,pointer.y);
    var playpress = this.playRect.contains(pointer.x,pointer.y);
    if(backpress===true) this.goBack();
    if(playpress===true) this.playGame();
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