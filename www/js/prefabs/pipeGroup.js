var PipeGroup = function(game, parent) {  
  Phaser.Group.call(this, game, parent);
  
  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.topPipe);
  this.add(this.bottomPipe);
  this.hasScored = false;
  
  // this.topPipe.body.velocity.x = -200;  
  // this.bottomPipe.body.velocity.x = -200;  
  this.setAll('body.velocity.x', -160);
  
  this.hasScored = false;
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);  
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
  this.checkWorldBounds(); 
};

PipeGroup.prototype.checkWorldBounds = function() {  
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};

PipeGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

PipeGroup.prototype.reset = function(x, y) {
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