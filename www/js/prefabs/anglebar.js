var AngleBar = function(game) {
  var gameover;
  Phaser.Group.call(this, game);
  
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
    if(this.cursor.x<this.bar.x-30) {
      this.cursor.x = this.bar.x-30;
      this.cursor.body.velocity.x = 200;
    }
    else if(this.cursor.x>this.bar.x+30) {
      this.cursor.x = this.bar.x+30;
      this.cursor.body.velocity.x = -200;
    }
  }
};

AngleBar.prototype.reset = function() {
  this.cursor.x = this.bar.x+40;
  this.angleset = false;
};

AngleBar.prototype.startCursor = function() {
  this.cursor.body.velocity.x=-200;
};

AngleBar.prototype.stopCursor = function() {
  this.angleset = true;
  this.cursor.body.velocity.x = 0;
  var ballVelo = (this.cursor.x - this.bar.x) * 2;
  return ballVelo;
};