var BowlingPin = function(game, x, y, frame, pinsCollisionGroup) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'bpin', frame);
  this.anchor.setTo(0.5, 0.5);
  
  // Set Pin Physics  
  this.game.physics.p2.enable(this, false);
  this.body.setRectangle(14, 28);
  this.body.setCollisionGroup(pinsCollisionGroup);
  this.body.damping = 0.5;
  this.body.mass = 5;
  
  // Pin Status
  this.gotHit = false;
  this.aboutToDie = false;
  this.removed = false;
  
  //  Create Timers
  this.removeTimer = this.game.time.create(false);
  this.removeTimer.add(2000, this.removePin, this);
  this.flickTimer = this.game.time.create(false);
  this.flickTimer.loop(30, this.flickerPin, this);
};

BowlingPin.prototype = Object.create(Phaser.Sprite.prototype);  
BowlingPin.prototype.constructor = BowlingPin;

BowlingPin.prototype.update = function() {
  if(this.gotHit && this.aboutToDie===false){
    this.removeTimer.start();
    this.flickTimer.start();
    this.aboutToDie = true;
  }
  if(this.body.x >  212){
    this.body.x = 212;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
  if(this.body.x <  0){
    this.body.x = 0;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
};

BowlingPin.prototype.removePin = function() {
  this.removed = true;
  //this.body = null;
  this.destroy();
};

BowlingPin.prototype.flickerPin = function() {
  this.visible = !this.visible;
};