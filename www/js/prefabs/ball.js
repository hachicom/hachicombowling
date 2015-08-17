var Ball = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'ball', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);

  // add and play animations
  //this.animations.add('roll');
  //this.animations.play('roll', 12, true);
  
  //  Input Enable the sprites
  this.inputEnabled = true;
  this.input.allowVerticalDrag = false;

  //  Allow dragging - the 'true' parameter will make the sprite snap to the center
  this.input.enableDrag(false);
  this.events.onDragUpdate.add(this.onBallDragUpdate,this);
  this.events.onDragStop.add(this.onBallDragStop, this);
  
  this.game.physics.p2.enable(this, false);
  this.body.setCircle(12);
  this.body.fixedRotation = true;
  this.body.mass = 10;
  //this.body.mass = 10;
  // this.body.friction = 0.97;
  // this.body.setCircle(12);
  // this.body.damping = 0.5;
  // this.body.fixedRotation = true;
  //this.body.collideWorldBounds = true;
  //this.body.allowGravity = false;
  
  this.onTrack = true;
  this.rolling = false;
  this.changedDir = false;
  
  //this.flapSound = this.game.add.audio('flap');
  this.events.onKilled.add(this.onKilled, this);
};

Ball.prototype = Object.create(Phaser.Sprite.prototype);  
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
  if(this.body.y <= 0) {
    this.onTrack = false;
    this.body.velocity.y = 0;
  }
  if(this.input.isDragged){
    this.body.x = this.game.input.activePointer.worldX;
    //this.body.y = this.game.input.activePointer.worldY;
  }
  if(this.body.x >  212){
    this.body.x = 212;
    this.body.velocity.x = 0;
  }
};

Ball.prototype.onBallDragUpdate = function(sprite, pointer) {
  if(sprite.body.x < 0) sprite.body.x = 0;
  if(sprite.body.x > 212) sprite.body.x = 212;
};

Ball.prototype.onBallDragStop = function(sprite, pointer) {
  this.rolling = true;
  this.body.velocity.y = -200;
  this.input.disableDrag();
};

Ball.prototype.revived = function() { 
};

Ball.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  this.animations.stop();
  console.log('killed');
};