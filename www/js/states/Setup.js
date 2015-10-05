var HachiBowl = HachiBowl || {};

HachiBowl.Setup = function(){};

HachiBowl.Setup.prototype = {
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
          [3,4,4,4,4,4,4,4,4,5],
          [3,4,4,4,4,4,4,4,4,5],
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
    
    this.game.stage.backgroundColor = bgcolor2;
    // tempVars
    this.sfxval = sfxOn;
    this.langval = language;
    this.vibval = vibrationOn;
    this.resetHighscore = false;
    
    var titleLabel = glossary.UI.optionsTitle[language];
    if (playerData.savedata.firstrun === true) titleLabel = glossary.UI.firstRunSetupTitle['all'];
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start36', titleLabel, 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    var screenLabel = glossary.UI.optionsTxt[language];
    if (playerData.savedata.firstrun === true) screenLabel = glossary.UI.firstRunSetupTxt['all'];
    this.optText = this.game.add.bitmapText(20, 104, 'start12', screenLabel, 12);
    // this.startText.anchor.setTo(0.5,0);
    
    // BUTTONS FOR SFX OPTIONS
    this.sfxCursor = this.game.add.sprite(80, 138, 'cursor');
    this.sfxCursor.anchor.setTo(0.5,0);
    if(sfxOn===false) this.sfxCursor.x = 240;
    
    this.sfxOnText = this.game.add.bitmapText(80, 130, 'start16', "[ON]", 16);
    this.sfxOnText.anchor.setTo(0.5,0.5);
    this.sfxOnRect = new Phaser.Rectangle(20,120,128,40);
    
    this.sfxOffText = this.game.add.bitmapText(240, 130, 'start16', "[OFF]", 16);
    this.sfxOffText.anchor.setTo(0.5,0.5);
    this.sfxOffRect = new Phaser.Rectangle(180,120,128,40);
    
    // BUTTONS FOR LANGUAGE OPTIONS
    this.langCursor = this.game.add.sprite(80, 198, 'cursor');
    this.langCursor.anchor.setTo(0.5,0);
    if(language==='en_US') this.langCursor.x = 240;
    
    this.hueBRText = this.game.add.bitmapText(80, 190, 'start16', "[BRASIL]", 16);
    this.hueBRText.anchor.setTo(0.5,0.5);
    this.hueBRRect = new Phaser.Rectangle(20,180,128,40);
    
    this.lolUSText = this.game.add.bitmapText(240, 190, 'start16', "[WORLD]", 16);
    this.lolUSText.anchor.setTo(0.5,0.5);
    this.lolUSRect = new Phaser.Rectangle(180,180,128,40);
    
    // BUTTONS FOR VIBRATE OPTIONS
    this.vibCursor = this.game.add.sprite(80, 258, 'cursor');
    this.vibCursor.anchor.setTo(0.5,0);
    if(vibrationOn===false) this.vibCursor.x = 240;
    
    this.vibOnText = this.game.add.bitmapText(80, 250, 'start16', "[ON]", 16);
    this.vibOnText.anchor.setTo(0.5,0.5);
    this.vibOnRect = new Phaser.Rectangle(20,240,128,40);
    
    this.vibOffText = this.game.add.bitmapText(240, 250, 'start16', "[OFF]", 16);
    this.vibOffText.anchor.setTo(0.5,0.5);
    this.vibOffRect = new Phaser.Rectangle(180,240,128,40);
    
    // BUTTONS FOR RESET SCORE OPTIONS
    if (playerData.savedata.firstrun === false){
      this.resetCursor = this.game.add.sprite(240, 318, 'cursor');
      this.resetCursor.anchor.setTo(0.5,0);
      
      this.resetOnText = this.game.add.bitmapText(80, 310, 'start16', glossary.UI.sim[language], 16);
      this.resetOnText.anchor.setTo(0.5,0.5);
      this.resetOnRect = new Phaser.Rectangle(20,300,128,40);
      
      this.resetOffText = this.game.add.bitmapText(240, 310, 'start16', glossary.UI.nao[language], 16);
      this.resetOffText.anchor.setTo(0.5,0.5);
      this.resetOffRect = new Phaser.Rectangle(180,300,128,40);
    }

    // BUTTONS FOR EXIT/SAVE
    if (playerData.savedata.firstrun === false){
      this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.voltar[language], 16);
      this.backText.anchor.setTo(0.5,0.5);
      this.backRect = new Phaser.Rectangle(0,384,160,64);
    }
    
    this.saveText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.salvar[language], 16);
    this.saveText.anchor.setTo(0.5,0.5);
    this.saveRect = new Phaser.Rectangle(160,384,160,64);
        
    // BRING CURSORS TO TOP
    this.sfxCursor.bringToTop();
    this.langCursor.bringToTop();
    this.vibCursor.bringToTop();
    if (playerData.savedata.firstrun === false) this.resetCursor.bringToTop();
    
    /*****************************
     ******** GAME SOUNDS ********
     *****************************/
    this.selectSound = this.game.add.audio('select');
    this.cancelSound = this.game.add.audio('cancel');

    // READ USER INPUT    
    this.game.input.onDown.add(this.handlePointerDown,this);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    // }
  },
  
  /* render: function(){
    this.game.debug.geom( this.sfxOnRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.sfxOffRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.hueBRRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.lolUSRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.vibOnRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.vibOffRect, 'rgba(255,0,255,0.4)' ) ;
    this.game.debug.geom( this.resetOnRect, 'rgba(255,255,0,0.4)' ) ;
    this.game.debug.geom( this.resetOffRect, 'rgba(255,0,255,0.4)' ) ;
  }, */
  
  handlePointerDown: function(pointer) {
    if(this.sfxOnRect.contains(pointer.x,pointer.y)){this.sfxval = true; this.sfxCursor.x = 80;}
    if(this.sfxOffRect.contains(pointer.x,pointer.y)){this.sfxval = false; this.sfxCursor.x = 240;}
    if(this.hueBRRect.contains(pointer.x,pointer.y)){this.langval = 'pt_BR'; this.langCursor.x = 80;}
    if(this.lolUSRect.contains(pointer.x,pointer.y)){this.langval = 'en_US'; this.langCursor.x = 240;}
    if(this.vibOnRect.contains(pointer.x,pointer.y)){this.vibval = true; this.vibCursor.x = 80;}
    if(this.vibOffRect.contains(pointer.x,pointer.y)){this.vibval = false; this.vibCursor.x = 240;}
    if (playerData.savedata.firstrun === false){
      if(this.resetOnRect.contains(pointer.x,pointer.y)){this.resetHighscore = true; this.resetCursor.x = 80;}
      if(this.resetOffRect.contains(pointer.x,pointer.y)){this.resetHighscore = false; this.resetCursor.x = 240;}      
    }
    
    if (playerData.savedata.firstrun === false) var backpress = this.backRect.contains(pointer.x,pointer.y);
    var savepress = this.saveRect.contains(pointer.x,pointer.y);
    if (playerData.savedata.firstrun === false) if(backpress===true) this.goBack();
    if(savepress===true) this.saveSettings();
  },
  
  goBack: function(){
    if(sfxOn===true){
      this.cancelSound.play();
    }
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
  },
  
  saveSettings: function(){
    sfxOn = this.sfxval;
    language = this.langval;
    vibrationOn = this.vibval;
    
    playerData.savedata.firstrun = false;
    playerData.settings.sfx = sfxOn;
    playerData.settings.language = language;
    playerData.settings.vibration = vibrationOn;
    if(this.resetHighscore === true){
      playerData.scoretable.names = ['BABE','HACHI','PEPITO','NICKY','MELODY','ROLF','YUKI','SNOW'];
      playerData.scoretable.scores = [4000,3000,2500,2000,1500,1000,750,500];
      playerData.scoretable2.names = ['HACHI','PEPITO','NICKY','BABE','SNOW','YUKI','ROLF','MELODY'];
      playerData.scoretable2.scores = [6000,5000,4000,3000,2500,2000,1500,1000];
    }
    
    localStorage["com.hachicom.bowling.playerData"] = JSON.encode(playerData);
    if(sfxOn===true){
      this.selectSound.play();
    }
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
  }
};