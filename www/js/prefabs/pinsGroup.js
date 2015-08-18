var BowlingPins = function(game, parent,pinsCollisionGroup,ballCollisionGroup) {  
  Phaser.Group.call(this, game, parent);
  
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.P2JS;
  
  this.pinsPosition = [
                       [64,40],[96,40],[128,40],[160,40],
                          [80,72],[112,72],[144,72],
                              [96,104],[128,104],
                                  [112,136]
                      ];
  
  for (var i = 0; i < 10; i++) {
    var bpin = this.create(this.pinsPosition[i][0], this.pinsPosition[i][1], 'bpin', 0);
    bpin.body.setRectangle(24, 32);
    bpin.body.setCollisionGroup(pinsCollisionGroup);
    bpin.body.collides([pinsCollisionGroup, ballCollisionGroup]);
    bpin.body.angularDamping = 0.5;
    bpin.body.mass = 5;
  }
};

BowlingPins.prototype = Object.create(Phaser.Group.prototype);  
BowlingPins.prototype.constructor = BowlingPins;

BowlingPins.prototype.update = function() {
  this.checkWorldBounds(); 
};

BowlingPins.prototype.checkWorldBounds = function() {  
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};

BowlingPins.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

BowlingPins.prototype.reset = function(x, y) {
  // Reset Pipes
  this.topPipe.reset(0,0); 
  this.bottomPipe.reset(0,440);

  // Define new position of group
  this.x = x; 
  this.y = y;

  // Set Velocity
  this.setAll('body.velocity.x', -160);

  // Set variables
  this.hasScored = false;
  this.exists = true;
};