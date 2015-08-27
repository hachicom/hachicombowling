var ScoreWindow = function(game) {
  var gameover;
  Phaser.Group.call(this, game);
  
  //create board sprite
  //this.window = this.create(0, 0, 'windowbig');
  this.tilewin = 	[
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,1,2],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[6,7,8],
        [0,1,2],
				[6,7,8],
			];
      
  for(var i = 0; i<11; i++) {
    for(var j = 0; j<3; j++) {
      var floor = this.create(j*32,i*32, 'windowtile', this.tilewin[i][j]);
    }
  }

  this.scoreLabelText = this.game.add.bitmapText(8, 106, 'start12', "SCORE", 12);
  this.add(this.scoreLabelText);
  this.scoreText = this.game.add.bitmapText(8, 126, 'start16', "0", 16);
  this.add(this.scoreText);

  this.spareLabelText = this.game.add.bitmapText(8, 156, 'start12', "SPARE", 12);
  this.add(this.spareLabelText);
  this.spareText = this.game.add.bitmapText(8, 176, 'start16', "0", 16);
  this.add(this.spareText);

  this.strikeLabelText = this.game.add.bitmapText(8, 206, 'start12', "STRIKE", 12);
  this.add(this.strikeLabelText);
  this.strikeText = this.game.add.bitmapText(8, 226, 'start16', "0", 16);
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

ScoreWindow.prototype = Object.create(Phaser.Group.prototype);  
ScoreWindow.prototype.constructor = ScoreWindow;

ScoreWindow.prototype.updateInfo = function(score,strike,spare,timer,diamond) {
  var timersec = timer/1000;
  var minutes = Math.floor(timersec / 60);
  var seconds = timersec - minutes * 60;
  if(seconds<10) seconds = '0'+seconds;
  
  this.scoreText.setText(score.toString());
  this.strikeText.setText(strike.toString());
  this.spareText.setText(spare.toString());
  this.diamondLabelText.setText("x"+diamond.toString());
  this.timerText.setText(minutes+':'+seconds);
};

ScoreWindow.prototype.pauseClick = function() {  
  //stageMusic.resume();
  this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Game");
  // this.game.state.start('Play');
};