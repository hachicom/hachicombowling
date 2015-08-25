var ScoreWindow = function(game) {
  var gameover;
  Phaser.Group.call(this, game);
  
  //create board sprite
  this.window = this.create(0, 0, 'windowbig');

  this.scoreLabelText = this.game.add.text(10, 10, "Score", medstyle);
  this.add(this.scoreLabelText);
  this.scoreText = this.game.add.text(10, 30, "0", medstyle);
  this.add(this.scoreText);

  this.spareLabelText = this.game.add.text(10, 60, "Spares", medstyle);
  this.add(this.spareLabelText);
  this.spareText = this.game.add.text(10, 80, "0", medstyle);
  this.add(this.spareText);

  this.strikeLabelText = this.game.add.text(10, 110, "Strikes", medstyle);
  this.add(this.strikeLabelText);
  this.strikeText = this.game.add.text(10, 130, "0", medstyle);
  this.add(this.strikeText);
  
  this.diamondicon = this.create(10, 168, 'diamondsmall');
  this.diamondLabelText = this.game.add.text(30, 160, "x0", medstyle);
  this.add(this.diamondLabelText);
  
  this.timerText = this.game.add.text(10, 222, "00:00", medstyle);
  this.add(this.timerText);

  // TODO: this will be the pause button
  // this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
  // this.startButton.anchor.setTo(0.5,0.5);

  // this.add(this.startButton);

  this.y = 96;
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

ScoreWindow.prototype.show = function(score) {  
  var medal, bestScore;

  // Step 1
  this.scoreText.setText(score.toString());

  if(!!localStorage) {
    // Step 2
    bestScore = localStorage.getItem('bestScore');

    // Step 3
    if(!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    // Fallback. LocalStorage isn't available
    bestScore = 'N/A';
  }

  // Step 4
  this.bestScoreText.setText(bestScore.toString());

  // Step 5 & 6
  if(score >= 10 && score < 20)
  {
    medal = this.game.add.sprite(-65 , 7, 'medals', 1);
    medal.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(medal);
  } else if(score >= 20) {
    medal = this.game.add.sprite(-65 , 7, 'medals', 0);
    medal.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(medal);
  }

  // Step 7
  if (medal) {    

    var emitter = this.game.add.emitter(medal.x, medal.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = medal.width;
    emitter.height = medal.height;

    emitter.makeParticles('particle');

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0,0);
    emitter.setYSpeed(0,0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);

  }
  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
};