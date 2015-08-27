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
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 20, 'start16', glossary.UI.optionsTitle[language], 16);
    this.titleMessage.align = 'center';
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.bitmapText(20, 104, 'start12', glossary.UI.optionsTxt[language], 12);
    // this.startText.anchor.setTo(0.5,0);
    
    this.backText = this.game.add.bitmapText(80, 416, 'start16', glossary.UI.voltar[language], 16);
    this.backText.anchor.setTo(0.5,0.5);
    this.backText.inputEnabled = true;
    this.backText.events.onInputUp.add(this.goBack, this);
    
    this.saveText = this.game.add.bitmapText(240, 416, 'start16', glossary.UI.salvar[language], 16);
    this.saveText.anchor.setTo(0.5,0.5);
    this.saveText.inputEnabled = true;
    this.saveText.events.onInputUp.add(this.saveSettings, this);
    
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
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Title");
  }
};
