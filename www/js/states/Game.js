var HachiBowl = HachiBowl || {};

//title screen
HachiBowl.Game = function(){};

HachiBowl.Game.prototype = {
  preload: function() {},
  
  create: function() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
        
    //  Create our collision groups. One for the ball, one for the pins
    var ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
    var pinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.game.physics.p2.updateBoundsCollisionGroup();
    
    this.bpins = this.game.add.group();
    this.bpins.enableBody = true;
    this.bpins.physicsBodyType = Phaser.Physics.P2JS;
    
    var bpin = this.bpins.create(128, 40, 'bpin', 0);
    bpin.body.setRectangle(24, 32);
    bpin.body.setCollisionGroup(pinsCollisionGroup);
    bpin.body.collides([pinsCollisionGroup, ballCollisionGroup]);
    bpin.body.angularDamping = 0.5;
    bpin.body.mass = 5;
    
    this.ball = new Ball(this.game, 192, this.game.height - 40, 0);
    this.game.add.existing(this.ball);

    // Set the ships collision group
    this.ball.body.setCollisionGroup(ballCollisionGroup);
    this.ball.body.collides(pinsCollisionGroup);
    
    this.game.stage.backgroundColor = '#000';
    
    this.portraitWindow = this.game.add.sprite(224, 0, 'windowsmall');
    this.scoreWindow = this.game.add.sprite(224, 96, 'windowbig');
  },
  
  update: function() {
    //this.game.physics.P2.collide(this.ball, this.bpin);
  },
  
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });
  },
  
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  }
};