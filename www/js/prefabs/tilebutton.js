var tileButtonMap = {
  start: { //1-1
      text: 'START',      
      layout: [
          [0,1,1,1,1,1,2],
          [6,7,7,7,7,7,8],
        ],
      icon: ''
  },

  pause: { //1-1
      text: 'START',      
      layout: [
          [0,1,2],
          [6,7,8],
        ],
      icon: ''
  },
};

var TileButton = function(game,mode) {
  Phaser.Group.call(this, game);
  
  //create board sprite
  //this.window = this.create(0, 0, 'windowbig');
  this.tilewin = tileButtonMap[mode]['layout'];
      
  for(var i = 0; i<this.tilewin.length; i++) {
    for(var j = 0; j<this.tilewin[i].length; j++) {
      var floor = this.create(j*32,i*32, 'windowtile', this.tilewin[i][j]);
    }
  }

  this.scoreLabelText = this.game.add.bitmapText(4, 106, 'start16', "SCORE", 12);
  this.add(this.scoreLabelText);
  this.scoreText = this.game.add.bitmapText(4, 126, 'start16', "0", 16);
  this.add(this.scoreText);

  this.spareLabelText = this.game.add.bitmapText(4, 156, 'start16', "SPARE", 12);
  this.add(this.spareLabelText);
  this.spareText = this.game.add.bitmapText(4, 176, 'start16', "0", 16);
  this.add(this.spareText);

  this.strikeLabelText = this.game.add.bitmapText(4, 206, 'start16', "STRIKE", 12);
  this.add(this.strikeLabelText);
  this.strikeText = this.game.add.bitmapText(4, 226, 'start16', "0", 16);
  this.add(this.strikeText);
  
  this.diamondicon = this.create(10, 258, 'diamondsmall');
  this.diamondicon.animations.add('shinesmall');
  this.diamondicon.animations.play('shinesmall', 12, true);
  this.diamondLabelText = this.game.add.bitmapText(30, 256, 'start16', "x0", 16);
  this.add(this.diamondLabelText);
  
  this.timerText = this.game.add.bitmapText(10, 310, 'start16', "00:00", 16);
  this.add(this.timerText);

  // TODO: this will be the pause button
  // this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
  // this.startButton.anchor.setTo(0.5,0.5);

  // this.add(this.startButton);

  this.y = 0;
  this.x = 224;

};

TileButton.prototype = Object.create(Phaser.Group.prototype);  
TileButton.prototype.constructor = TileButton;

TileButton.prototype.pauseClick = function() {  
  //stageMusic.resume();
  this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Game");
  // this.game.state.start('Play');
};