var HachiBowl = HachiBowl || {};

HachiBowl.Title = function(){};

HachiBowl.Title.prototype = {
  init: function() {
  },
  
  preload: function() {},
  
  create: function() {    
    this.game.stage.backgroundColor = '#aaaaaa';
    
    this.titleMessage = this.game.add.text(this.game.world.centerX, 10, "HACHICOM\nBOWLING", bigstyle);
    this.titleMessage.anchor.setTo(0.5,0);
    
    this.startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "TOUCH TO START", calcstyle);
    this.startText.anchor.setTo(0.5,0);
    
    // this.pauseButton = this.game.add.sprite(224, this.scoreWindow.y + this.scoreWindow.height + 64, 'pause');
    // this.pauseButton.inputEnabled = true;
    // this.pauseButton.events.onInputUp.add(this.restartGame, this);
  },
  
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.plugin.fadeAndPlay("rgb(0,0,0)",2,"Game");
    }
  },
};
