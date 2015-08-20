var HachiBowl = HachiBowl || {};

HachiBowl.Gameover = function(){};

HachiBowl.Gameover.prototype = {
  init: function(paramArr) {
    this.score        = paramArr[0];
    this.strikes      = paramArr[1];
    this.totalStrikes = paramArr[2];
    this.spares       = paramArr[3];
    this.totalSpares  = paramArr[4];
  },
  
  preload: function() {},
  
  create: function() {
    this.finalScore = this.score + (100*this.totalStrikes) + (50*this.totalSpares);
    
    this.titleMessage = this.game.add.text(this.game.world.centerX, 64, "RESULTS", bigstyle);
    this.titleMessage.anchor.setTo(0.5,0.5);
    
    this.strikeCalcText = this.game.add.text(64, 160, "STRIKES: "+this.totalStrikes+" x100", calcstyle);
    this.strikeCalcText.anchor.setTo(0,0.5);
    this.strikeText = this.game.add.text(64, 190, (this.totalStrikes * 100), calcstyle);
    this.strikeText.anchor.setTo(0,0.5);
    
    this.spareCalcText = this.game.add.text(64, 224, "SPARES: "+this.totalSpares+" x50", calcstyle);
    this.spareCalcText.anchor.setTo(0,0.5);
    this.spareText = this.game.add.text(64, 254, (this.totalSpares * 50), calcstyle);
    this.spareText.anchor.setTo(0,0.5);
    
    this.scorelabelText = this.game.add.text(64, 320, "FINAL SCORE:", calcstyle);
    this.scorelabelText.anchor.setTo(0,0.5);
    this.scoreText = this.game.add.text(this.game.world.centerX, 360, this.finalScore, bigstyle);
    this.scoreText.anchor.setTo(0.5,0.5);
    
    // this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    // this.pauseButton.inputEnabled = true;
    // this.pauseButton.events.onInputUp.add(this.restartGame, this);
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",1,"Game");
    }
  },
};
