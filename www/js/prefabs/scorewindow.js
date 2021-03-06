var ScoreWindow = function(game,gamemode) {
  var gameover;
  Phaser.Group.call(this, game);
  this.gamemode = gamemode;
  
  //create board sprite
  //this.window = this.create(0, 0, 'windowbig');
  this.tilewin = 	[
				[9,10,11],
				[12,13,14],
				[15,16,17],
				[0,1,2],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[3,4,5],
				[6,7,8],
        [0,1,2],
				[6,7,8],
			];
  
  this.sprPlayerFace = this.create(0, 0, 'playerface', currentHero);  
  
  for(var i = 0; i<11; i++) {
    for(var j = 0; j<3; j++) {
      var tilefloor = this.create(j*32,i*32, 'windowtile', this.tilewin[i][j]);
    }
  }

  this.scoreLabelText = this.game.add.bitmapText(8, 106, 'start12', "SCORE", 12);
  this.add(this.scoreLabelText);
  this.scoreText = this.game.add.bitmapText(8, 126, 'start16', "0", 16);
  this.add(this.scoreText);

  this.roundLabelText = this.game.add.bitmapText(8, 156, 'start12', "ROUND", 12);
  this.add(this.roundLabelText);
  this.roundText = this.game.add.bitmapText(8, 176, 'start16', "0", 16);
  this.add(this.roundText);

  this.turnLabelText = this.game.add.bitmapText(8, 206, 'start12', "TURN", 12);
  this.add(this.turnLabelText);
  this.turnText = this.game.add.bitmapText(8, 226, 'start16', "0", 16);
  this.add(this.turnText);
  
  this.diamondicon = this.create(10, 258, 'diamondsmall');
  this.diamondicon.animations.add('shinesmall');
  this.diamondicon.animations.play('shinesmall', 12, true);
  this.diamondLabelText = this.game.add.bitmapText(30, 256, 'start16', "x0", 16);
  this.add(this.diamondLabelText);
  
  this.heartbar = this.game.add.tileSprite(8, 310, 80, 16, 'heart');
  this.add(this.heartbar);
  
  if(this.gamemode == 'B'){
    this.timerText = this.game.add.bitmapText(10, 310, 'start16', "00:00", 16);
    this.heartbar.visible = false;
  }else{
    this.timerText = this.game.add.bitmapText(10, 310, 'start16', "", 16);
  }
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

ScoreWindow.prototype.updateInfo = function(score,turn,round,timer,diamond,lives) {
  this.scoreText.setText(score.toString());
  this.turnText.setText(turn.toString());
  this.roundText.setText(round.toString());
  this.diamondLabelText.setText("x"+diamond.toString());
  
  if(this.gamemode == 'B'){
    var timersec = timer/1000;
    var minutes = Math.floor(timersec / 60);
    var seconds = timersec - minutes * 60;
    if(seconds<10) seconds = '0'+seconds;
    this.timerText.setText(minutes+':'+seconds);
  }else{
    this.heartbar.width = 16*lives;
    //var lifebar = '';
    //for(var i=0;i<lives; i++) lifebar += '!';
    //this.timerText.setText(lifebar);
  }
};

ScoreWindow.prototype.pauseClick = function() {  
  //stageMusic.resume();
  this.game.plugin.fadeAndPlay("rgb(0,0,0)",0.5,"Game");
  // this.game.state.start('Play');
};