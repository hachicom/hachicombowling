var Bird = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);

  // add and play animations
  this.animations.add('flap');
  this.animations.play('flap', 12, true);
  
  this.game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;
  this.body.allowGravity = false;
  
  this.alive = false;
  this.onGround = false;
  
  this.flapSound = this.game.add.audio('flap');
  this.events.onKilled.add(this.onKilled, this);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);  
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  if(this.angle < 90 && this.alive) {
    this.angle += 2.5;
  }  
  
  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Bird.prototype.flap = function() {
  if(!!this.alive) {
    this.body.velocity.y = -420;
    
    // rotate the bird to -40 degrees
    this.game.add.tween(this).to({angle: -40}, 100).start();
    
    // play flap sound
    this.flapSound.play();
  }
};

Bird.prototype.revived = function() { 
};

Bird.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  var duration = 90 / this.y * 300;
  this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('killed');
  console.log('alive:', this.alive);
};