var Player = function(game, x, y, frame, ball) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'player', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.originX = x;
  this.originY = y;

  // add and play animations
  //this.animations.add('roll');
  //this.animations.play('roll', 12, true);
  
  this.ball = ball;
  this.launched = false;
  
  //  Input Enable the sprites
  this.inputEnabled = true;
  this.input.allowVerticalDrag = false;

  //  Allow dragging - the 'true' parameter will make the sprite snap to the center
  this.input.enableDrag(false);
  this.input.disableDrag();
  this.events.onDragUpdate.add(this.onPlayerDragUpdate,this);
  this.events.onDragStop.add(this.onPlayerDragStop, this);
  
  //this.flapSound = this.game.add.audio('flap');
  this.events.onKilled.add(this.onKilled, this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);  
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  if(this.input.isDragged){
    this.x = this.game.input.activePointer.worldX;
    //this.y = this.game.input.activePointer.worldY;
  }
  if(this.x < 32) this.x = 32;
  if(this.x > 192) this.x = 192;
  
  if(this.launched===false){
    this.ball.body.x = this.x;
    this.ball.body.y = this.y - 32;
  }
};

Player.prototype.onPlayerDragUpdate = function(sprite, pointer) {
  if(sprite.x < 32) sprite.x = 32;
  if(sprite.x > 192) sprite.x = 192;
};

Player.prototype.onPlayerDragStop = function(sprite, pointer) {
  this.input.disableDrag();
  this.launched = true;
  this.ball.roll();
};

Player.prototype.reset = function() {
  this.input.enableDrag();
  this.launched = false;
  this.x = this.originX;
  this.y = this.originY;
  this.ball.reset();
};

Player.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  this.animations.stop();
  console.log('killed');
};