var AngleBar = function(game) {
  var gameover;
  Phaser.Group.call(this, game);
  
  //configuration
  this.cursorspeed = 200;
  this.maxlimit = 70;
  
  //create meter sprite
  this.bar = this.create(0, 0, 'barmeter');
  this.bar.anchor.setTo(0.5,0.5);
  this.cursor = this.create(this.bar.x+40, this.bar.y, 'cursor');
  this.cursor.anchor.setTo(0.5,0);
  
  this.game.physics.enable(this.cursor, Phaser.Physics.ARCADE);
  this.cursor.body.velocity.x=0;
  
  this.angleset = false;

  this.y = this.game.height/2;
  this.x = 112;

};

AngleBar.prototype = Object.create(Phaser.Group.prototype);  
AngleBar.prototype.constructor = AngleBar;

AngleBar.prototype.update = function() {
  if(this.angleset === false){
    if(this.cursor.x<this.bar.x-this.maxlimit) {
      this.cursor.x = this.bar.x-this.maxlimit;
      this.cursor.body.velocity.x = this.cursorspeed;
    }
    else if(this.cursor.x>this.bar.x+this.maxlimit) {
      this.cursor.x = this.bar.x+this.maxlimit;
      this.cursor.body.velocity.x = -this.cursorspeed;
    }
  }
};

AngleBar.prototype.reset = function() {
  this.cursor.x = this.bar.x+this.maxlimit;
  this.angleset = false;
};

AngleBar.prototype.startCursor = function() {
  this.cursor.body.velocity.x=-this.cursorspeed;
};

AngleBar.prototype.stopCursor = function() {
  this.angleset = true;
  this.cursor.body.velocity.x = 0;
  var ballVelo = (this.cursor.x - this.bar.x);
  if(ballVelo>=-8 && ballVelo<=8) ballVelo = 0;
  else if(ballVelo < -60 || ballVelo > 60) ballVelo *= 2;
  return ballVelo;
};

AngleBar.prototype.freeze = function() {
  this.angleset = true;
  this.cursor.body.velocity.x = 0;
};