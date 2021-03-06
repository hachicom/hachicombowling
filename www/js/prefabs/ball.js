var Ball = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'ball', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.originX = x;
  this.originY = y;
  this.nameid = 'ball';

  // add and play animations
  //this.animations.add('roll');
  //this.animations.play('roll', 12, true);
  
  this.game.physics.p2.enable(this, false);
  this.body.setCircle(12);
  this.body.fixedRotation = true;
  this.body.mass = 20;
  this.accelVal = 0;
  //this.body.damping = 0.6;
  //this.body.mass = 10;
  // this.body.friction = 0.97;
  // this.body.setCircle(12);
  // this.body.damping = 0.5;
  // this.body.fixedRotation = true;
  
  this.onTrack = true;
  this.rolling = false;
  this.changedDir = 0;
  this.maxChangeDir = 3;
  
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
  if(this.body.x >=  210){
    this.body.x = 212;
    this.body.velocity.x = 0;
  }else if(this.body.x <=  14){
    this.body.x = 12;
    this.body.velocity.x = 0;
  }else {
    this.body.velocity.x += this.accelVal;
    // if(this.body.velocity.x > 150) this.body.velocity.x = 150;
    // if(this.body.velocity.x < -150) this.body.velocity.x = -150;
  }
  if(this.rolling===true) this.body.velocity.y = -300;
};

Ball.prototype.roll = function(velx) {
  this.rolling = true;
  this.body.velocity.x = velx;
};

Ball.prototype.freeze = function() {
  this.rolling = false;
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.accelVal = 0;
};

Ball.prototype.reset = function() {
  this.onTrack = true;
  this.rolling = false;
  this.changedDir = 0;
  this.accelVal = 0;
  
  this.body.reset(this.originX,this.originY);
};

Ball.prototype.changeDirection = function(direction) {
  if(this.changedDir < this.maxChangeDir && this.rolling === true){
    if(direction=='left'){
      //this.body.velocity.x -= 80;
      this.accelVal -= 8;
    }
    if(direction=='right'){
      //this.body.velocity.x += 80;
      this.accelVal += 8;
    }
    this.changedDir += 1;
  }
};

Ball.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  this.animations.stop();
  console.log('killed');
};