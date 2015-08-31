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
    
    this.game.stage.backgroundColor = '#aaaaff';
    // tempVars
    this.sfxval = sfxOn;
    this.langval = language;
    this.vibval = vibrationOn;
    this.resetHighscore = false;
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start16', glossary.UI.optionsTitle[language], 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 104, 'start12', glossary.UI.optionsTxt[language], 12);
    // this.startText.anchor.setTo(0.5,0);
    
    // BUTTONS FOR SFX OPTIONS
    this.sfxCursor = this.game.add.sprite(80, 138, 'cursor');
    this.sfxCursor.anchor.setTo(0.5,0);
    if(sfxOn===false) this.sfxCursor.x = 240;
    
    this.sfxOnText = this.game.add.bitmapText(80, 130, 'start16', "[ON]", 16);
    this.sfxOnText.anchor.setTo(0.5,0.5);
    this.sfxOnText.inputEnabled = true;
    this.sfxOnText.events.onInputUp.add(function(){
      //sfxOn = true;
      this.sfxval = true;
      this.sfxCursor.x = 80;
    },this);
    
    this.sfxOffText = this.game.add.bitmapText(240, 130, 'start16', "[OFF]", 16);
    this.sfxOffText.anchor.setTo(0.5,0.5);
    this.sfxOffText.inputEnabled = true;
    this.sfxOffText.events.onInputUp.add(function(){
      //sfxOn = false;
      this.sfxval = false;
      this.sfxCursor.x = 240;
    },this);
    
    // BUTTONS FOR LANGUAGE OPTIONS
    this.langCursor = this.game.add.sprite(80, 198, 'cursor');
    this.langCursor.anchor.setTo(0.5,0);
    if(language==='en_US') this.langCursor.x = 240;
    
    this.hueBRText = this.game.add.bitmapText(80, 190, 'start16', "[BRASIL]", 16);
    this.hueBRText.anchor.setTo(0.5,0.5);
    this.hueBRText.inputEnabled = true;
    this.hueBRText.events.onInputUp.add(function(){
      //language = 'pt_BR';
      this.langval = 'pt_BR';
      this.langCursor.x = 80;
    },this);
    
    this.lolUSText = this.game.add.bitmapText(240, 190, 'start16', "[WORLD]", 16);
    this.lolUSText.anchor.setTo(0.5,0.5);
    this.lolUSText.inputEnabled = true;
    this.lolUSText.events.onInputUp.add(function(){
      //language = 'en_US';
      this.langval = 'en_US';
      this.langCursor.x = 240;
    },this);
    
    // BUTTONS FOR VIBRATE OPTIONS
    this.vibCursor = this.game.add.sprite(80, 258, 'cursor');
    this.vibCursor.anchor.setTo(0.5,0);
    if(vibrationOn===false) this.vibCursor.x = 240;
    
    this.vibOnText = this.game.add.bitmapText(80, 250, 'start16', "[ON]", 16);
    this.vibOnText.anchor.setTo(0.5,0.5);
    this.vibOnText.inputEnabled = true;
    this.vibOnText.events.onInputUp.add(function(){
      //vibrationOn = true;
      this.vibval = true;
      this.vibCursor.x = 80;
    },this);
    
    this.vibOffText = this.game.add.bitmapText(240, 250, 'start16', "[OFF]", 16);
    this.vibOffText.anchor.setTo(0.5,0.5);
    this.vibOffText.inputEnabled = true;
    this.vibOffText.events.onInputUp.add(function(){
      //vibrationOn = false;
      this.vibval = false;
      this.vibCursor.x = 240;
    },this);
    
    // BUTTONS FOR RESET SCORE OPTIONS
    this.resetCursor = this.game.add.sprite(240, 318, 'cursor');
    this.resetCursor.anchor.setTo(0.5,0);
    
    this.resetOnText = this.game.add.bitmapText(80, 310, 'start16', glossary.UI.sim[language], 16);
    this.resetOnText.anchor.setTo(0.5,0.5);
    this.resetOnText.inputEnabled = true;
    this.resetOnText.events.onInputUp.add(function(){
      this.resetHighscore = true;
      this.resetCursor.x = 80;
    },this);
    
    this.resetOffText = this.game.add.bitmapText(240, 310, 'start16', glossary.UI.nao[language], 16);
    this.resetOffText.anchor.setTo(0.5,0.5);
    this.resetOffText.inputEnabled = true;
    this.resetOffText.events.onInputUp.add(function(){
      this.resetHighscore = false;
      this.resetCursor.x = 240;
    },this);
        
    // BUTTONS FOR EXIT/SAVE
    this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.voltar[language], 16);
    this.backText.anchor.setTo(0.5,0.5);
    this.backText.inputEnabled = true;
    this.backText.events.onInputUp.add(this.goBack, this);
    
    this.saveText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.salvar[language], 16);
    this.saveText.anchor.setTo(0.5,0.5);
    this.saveText.inputEnabled = true;
    this.saveText.events.onInputUp.add(this.saveSettings, this);
    
    // BRING CURSORS TO TOP
    this.sfxCursor.bringToTop();
    this.langCursor.bringToTop();
    this.vibCursor.bringToTop();
    this.resetCursor.bringToTop();
    
    // this.copyrightText = this.game.add.bitmapText(this.game.world.centerX, this.game.height-86, 'start16', "© 2015 ADINAN BATISTA ALVES\n\n       HACHICOM SOFT", 10);
    // this.copyrightText.anchor.setTo(0.5,0);
  },
  
  update: function() {
    // if(this.game.input.activePointer.justPressed()) {
      // this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    // }
  },
  
  goBack: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
  },
  
  saveSettings: function(){
    sfxOn = this.sfxval;
    language = this.langval;
    vibrationOn = this.vibval;
    
    playerData.settings.sfx = sfxOn;
    playerData.settings.language = language;
    playerData.settings.vibration = vibrationOn;
    if(this.resetHighscore === true){
      playerData.scoretable.names = ['HACHI','PEPITO','NICKY','PUNK','MELODY','ROLF','YUKI','SNOW'];
      playerData.scoretable.scores = [4000,3000,2500,2000,1500,1000,750,500];
    }
    
    localStorage["com.hachicom.bowling.playerData"] = JSON.encode(playerData);
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
  }
};