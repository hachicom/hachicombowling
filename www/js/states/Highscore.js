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
    
    this.titleMessage = this.game.add.bitmapText(this.game.world.centerX, 10, 'start36', "HI-SCORE", 36);
    this.titleMessage.anchor.setTo(0.5,0);
    
    var nameTxt = '';
    var scoreTxt = '';
    for(var i=0;i<this.scoretable.length;i++){
      nameTxt  += this.namestable[i] + '\n\n';
      scoreTxt += this.scoretable[i] + '\n\n';
    }
    
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX - 80, 128, 'start16', nameTxt, 16);
    this.scoreText.anchor.setTo(0.5,0);
    this.scoreText.align = 'right';
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX + 80, 128, 'start16', scoreTxt, 16);
    this.scoreText.anchor.setTo(0.5,0);
    
    // this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    // this.pauseButton.inputEnabled = true;
    // this.pauseButton.events.onInputUp.add(this.restartGame, this);
        
    this.titleTimer = this.game.time.create(false);
    this.titleTimer.add(10000, this.showTitle, this);
    this.titleTimer.start();
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Title");
    }
  },
  
  
  showTitle: function(){
    this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Title");
  }
};
