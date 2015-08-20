var Ball = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'ball', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.originX = x;
  this.originY = y;

  // add and play animations
  //this.animations.add('roll');
  //this.animations.play('roll', 12, true);
  
  this.game.physics.p2.enable(this, false);
  this.body.setCircle(12);
  this.body.fixedRotation = true;
  this.body.mass = 20;
  //this.accelVal = 0;
  //this.body.damping = 0.6;
  //this.body.mass = 10;
  // this.body.friction = 0.97;
  // this.body.setCircle(12);
  // this.body.damping = 0.5;
  // this.body.fixedRotation = true;
  
  this.onTrack = true;
  this.rolling = false;
  this.changedDir = false;
  
  //this.flapSound = this.game.add.audio('flap');
  this.events.onKilled.add(this.onKilled, this);
};

Ball.prototype = Object.create(Phaser.Sprite.prototype);  
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
  if(this.body.y <= -32) {
    this.onTrack = false;
    this.body.velocity.y = 0;
  }
  if(this.body.x >  212){
    this.body.x = 212;
    this.body.velocity.x = 0;
  }else if(this.body.x <  0){
    this.body.x = 0;
    this.body.velocity.x = 0;
  }//else this.body.velocity.x += this.accelVal;
  if(this.rolling===true) this.body.velocity.y = -300;
};

Ball.prototype.roll = function() {
  this.rolling = true;
};

Ball.prototype.freeze = function() {
  this.rolling = false;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
};

Ball.prototype.reset = function() {
  this.onTrack = true;
  this.rolling = false;
  this.changedDir = false;
  this.accelVal = 0;
  
  this.body.reset(this.originX,this.originY);
};

Ball.prototype.listenChangeDirection = function() {
  if(this.changedDir === false && this.rolling === true){
    if(this.game.input.activePointer.x < this.body.x && this.game.input.activePointer.isDown){
      this.body.velocity.x = -90;
      this.changedDir = true;
    }
    if(this.game.input.activePointer.x >= this.body.x && this.game.input.activePointer.isDown){
      this.body.velocity.x = 90;
      this.changedDir = true;
    }
  }
};

Ball.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  this.animations.stop();
  console.log('killed');
};