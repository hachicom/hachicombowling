var HachiBowl = HachiBowl || {};

HachiBowl.Menu = function(){};

HachiBowl.Menu.prototype = {
  init: function(paramArr) {
    this.gamemode = paramArr[0];
  },
  
  preload: function() {},
  
  create: function() {    
    this.bgimg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.bgimg.autoScroll(10, 20);
  
    this.tilewin = 	[
          [-1,0,1,1,1,1,1,1,2,-1],
          [-1,6,7,7,7,7,7,7,8,-1],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [0,1,1,1,1,1,1,1,1,2],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,9,10,11,5],
          [3,4,4,4,4,4,12,13,14,5],
          [3,4,4,4,4,4,15,16,17,5],
          [3,4,4,4,4,4,4,4,4,5],
          [6,7,7,7,7,7,7,7,7,8],
          [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
          [0,1,1,1,2,0,1,1,1,2],
          [6,7,7,7,8,6,7,7,7,8],
        ];
    
    this.sprPlayerFace = this.game.add.sprite(192, 192, 'playerface', 0);
    this.sprPlayerFace.frame = 0;    
    
    for(var i = 0; i<this.tilewin.length; i++) {
      for(var j = 0; j<this.tilewin[i].length; j++) {
        if(this.tilewin[i][j]>-1) var wintile = this.game.add.sprite(j*32,i*32, 'windowtile', this.tilewin[i][j]);
      }
    }
        
    this.game.stage.backgroundColor = bgcolor2;
    // tempVars
    this.bgmval = 'off'
    this.bgm1music = this.game.add.audio('bgm1', 1, true);
    this.bgm2music = this.game.add.audio('bgm2', 1, true);
    currentBGM = this.bgm1music;
    if(sfxOn===true) {
      this.bgmval = 'bgm1';
      currentBGM.play();
    }
    this.heroval = 0;
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', glossary.UI['menuTitle'+this.gamemode][language], 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 104, 'start12', glossary.UI.menuTxt[language], 12);
    // this.startText.anchor.setTo(0.5,0);
    
    // BUTTONS FOR MUSIC SELECTION
    this.bgmCursor = this.game.add.sprite(80, 138, 'cursor');
    this.bgmCursor.anchor.setTo(0.5,0);
    if(sfxOn!==true) this.bgmCursor.x = 260;
    
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
    
    this.punkText = this.game.add.bitmapText(20, 320, 'start16', "[BABE]", 16);
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
    
    /*****************************
     ******** GAME SOUNDS ********
     *****************************/
    this.selectSound = this.game.add.audio('select');
    this.cancelSound = this.game.add.audio('cancel');
    
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
    if(this.bgmOneRect.contains(pointer.x,pointer.y)){
      this.bgmval = 'bgm1'; this.bgmCursor.x = 60; 
      currentBGM.stop();
      currentBGM = this.bgm1music;
      currentBGM.play();
      if(sfxOn===true) this.cancelSound.play();
    }
    if(this.bgmTwoRect.contains(pointer.x,pointer.y)){
      this.bgmval = 'bgm2'; this.bgmCursor.x = 160; 
      currentBGM.stop();
      currentBGM = this.bgm2music;
      currentBGM.play();
      if(sfxOn===true) this.cancelSound.play();
    }
    if(this.bgmOffRect.contains(pointer.x,pointer.y)){
      this.bgmval = 'off'; this.bgmCursor.x = 260; 
      currentBGM.stop();
      if(sfxOn===true) this.cancelSound.play();
    }
    
    if(this.hachiRect.contains(pointer.x,pointer.y)){
      this.heroval = 0; this.charCursor.x = 80; this.charCursor.y = 208; this.sprPlayerFace.frame = 0; 
      if(sfxOn===true) this.selectSound.play();
    }
    if(this.pepitoRect.contains(pointer.x,pointer.y)){
      this.heroval = 1; this.charCursor.x = 80; this.charCursor.y = 248;this.sprPlayerFace.frame = 1;
      if(sfxOn===true) this.selectSound.play();
    }
    if(this.nickyRect.contains(pointer.x,pointer.y)){
      this.heroval = 2; this.charCursor.x = 80; this.charCursor.y = 288; this.sprPlayerFace.frame = 2;
      if(sfxOn===true) this.selectSound.play();
    }
    if(this.punkRect.contains(pointer.x,pointer.y)){
      this.heroval = 3; this.charCursor.x = 80; this.charCursor.y = 328;  this.sprPlayerFace.frame = 3;
      if(sfxOn===true) this.selectSound.play();
    }
    
    var backpress = this.backRect.contains(pointer.x,pointer.y);
    var playpress = this.playRect.contains(pointer.x,pointer.y);
    if(backpress===true) {this.goBack(); if(sfxOn===true) this.cancelSound.play();}
    if(playpress===true) {this.playGame(); if(sfxOn===true) this.selectSound.play();}
  },
  
  goBack: function(){
    currentBGM.stop();
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
  },
  
  playGame: function(){
    bgmval = this.bgmval;
    currentHero = this.heroval;
    //if(isMobile()) {if(AdMob) AdMob.hideBanner();}
    
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game",[this.gamemode]);
  }
};