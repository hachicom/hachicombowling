var HachiBowl = HachiBowl || {};

HachiBowl.Gameover = function(){};

HachiBowl.Gameover.prototype = {
  init: function(paramArr) {
    this.score        = paramArr[0];
    this.strikes      = paramArr[1];
    this.totalStrikes = paramArr[2];
    this.spares       = paramArr[3];
    this.totalSpares  = paramArr[4];
    this.diamonds     = paramArr[5];
    
    this.scoretable = playerData.scoretable.scores;
  },
  
  preload: function() {},
  
  create: function() {
    this.finalScore = this.score + (100*this.totalStrikes) + (50*this.totalSpares) + (500*this.diamonds);
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 64, 'start36', "RESULTS", 36);
    this.titleMessage.anchor.setTo(0.5,0.5);
    
    this.spareCalcText = this.game.add.bitmapText(32, 160, 'start16', "SPARES: "+this.totalSpares.toString()+" x50", 16);
    this.spareCalcText.anchor.setTo(0,0.5);
    this.spareText = this.game.add.bitmapText(32, 190, 'start16', (this.totalSpares * 50).toString(), 16);
    this.spareText.anchor.setTo(0,0.5);
    
    this.strikeCalcText = this.game.add.bitmapText(32, 224, 'start16', "STRIKES: "+this.totalStrikes.toString()+" x100", 16);
    this.strikeCalcText.anchor.setTo(0,0.5);
    this.strikeText = this.game.add.bitmapText(32, 254, 'start16', (this.totalStrikes * 100).toString(), 16);
    this.strikeText.anchor.setTo(0,0.5);
    
    this.diamondCalcText = this.game.add.bitmapText(32, 288, 'start16', "DIAMONDS: "+this.diamonds.toString()+" x500", 16);
    this.diamondCalcText.anchor.setTo(0,0.5);
    this.diamondText = this.game.add.bitmapText(32, 318, 'start16', (this.diamonds * 500).toString(), 16);
    this.diamondText.anchor.setTo(0,0.5);
    
    this.scorelabelText = this.game.add.bitmapText(32, 384, 'start16', "FINAL SCORE:", 16);
    this.scorelabelText.anchor.setTo(0,0.5);
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 420, 'start36', this.finalScore.toString(), 36);
    this.scoreText.anchor.setTo(0.5,0.5);
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      registerName = false;
      for(var i=0;i<this.scoretable.length;i++){
        if (this.scoretable[i]<this.finalScore) {
          registerName = true;
          break;
        }
      }
      if(registerName === true) this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Register",[this.finalScore]);
      else this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Highscore");
    }
  },
};
