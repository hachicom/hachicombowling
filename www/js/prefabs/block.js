var Block = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'block', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  this.originX = x;
  this.originY = y;
  this.nameid = 'block';
  this.hvelo = this.lastvelo = 10;
  this.gothit = false;
  this.initialframe = frame;
    
  this.game.physics.arcade.enableBody(this);
  this.body.velocity.x = this.hvelo;

  // add and play animations
  //this.animations.add('roll');
  //this.animations.play('roll', 12, true);
  
  this.visible = false;
  
  //this.flapSound = this.game.add.audio('flap');
  this.events.onKilled.add(this.onKilled, this);
};

Block.prototype = Object.create(Phaser.Sprite.prototype);  
Block.prototype.constructor = Block;

Block.prototype.update = function() {
  if(this.visible === true && this.gothit === false){
    if(this.body.x >=  168){
      this.body.velocity.x = this.hvelo * (-1);
    }else if(this.body.x <=  32){
      this.body.velocity.x = this.hvelo;
    }
  }else{
    this.body.velocity.x = 0;
  }
};

Block.prototype.freeze = function() {
  this.gothit = true;
  this.lastvelo = this.body.velocity.x;
  //this.body.velocity.x = 0;
  this.frame = 3;
};

Block.prototype.reset = function() {
  this.gothit = false;
  this.frame = this.initialframe;
  this.hvelo+=10;
  if(this.lastvelo<0) this.body.velocity.x = this.hvelo * (-1);
  else this.body.velocity.x = this.hvelo;
};

Block.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  this.animations.stop();
  console.log('killed');
};