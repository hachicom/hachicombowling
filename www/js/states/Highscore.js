var HachiBowl = HachiBowl || {};

HachiBowl.Highscore = function(){};

HachiBowl.Highscore.prototype = {
  init: function() {
    //this.score = paramArr[0];
    
    this.scoretable = playerData.scoretable.scores;
    this.namestable = playerData.scoretable.names;
  },
  
  preload: function() {},
  
  create: function() {
    this.finalScore = this.score + (100*this.totalStrikes) + (50*this.totalSpares);
    
    this.titleMessage = this.game.add.text(this.game.world.centerX, 10, "HI-SCORE", bigstyle);
    this.titleMessage.anchor.setTo(0.5,0);
    
    var nameTxt = '';
    var scoreTxt = '';
    for(var i=0;i<5;i++){
      nameTxt  += this.namestable[i] + '\n';
      scoreTxt += this.scoretable[i] + '\n';
    }
    
    this.scoreText = this.game.add.text(this.game.world.centerX - 80, 128, nameTxt, calcstyle);
    this.scoreText.anchor.setTo(0.5,0);
    this.scoreText = this.game.add.text(this.game.world.centerX + 80, 128, scoreTxt, calcstyle);
    this.scoreText.anchor.setTo(0.5,0);
    
    // this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    // this.pauseButton.inputEnabled = true;
    // this.pauseButton.events.onInputUp.add(this.restartGame, this);
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
    }
  },
};
