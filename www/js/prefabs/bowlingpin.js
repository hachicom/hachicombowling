var BowlingPin = function(game, x, y, frame) {
  // The super call to Phaser.Sprite
  Phaser.Sprite.call(this, game, x, y, 'bpin', frame);
  this.anchor.setTo(0.5, 0.5);
  //this.body.friction = 0.95;

  //this.body.allowGravity = false;
  //this.body.immovable = true;
};

BowlingPin.prototype = Object.create(Phaser.Sprite.prototype);  
BowlingPin.prototype.constructor = BowlingPin;

BowlingPin.prototype.update = function() {
  
};