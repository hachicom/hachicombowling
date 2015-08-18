var HachiBowl = HachiBowl || {};

//title screen
HachiBowl.Game = function(){};

HachiBowl.Game.prototype = {
  preload: function() {},
  
  create: function() {
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.8;
    
    // Game variables
    this.round = 1; //current round
    this.turn = 0; //2 turns per round
    this.pinsHit = 0;
    this.lasthit = 0;
    this.score = 0;
    this.lasthits = [];
    this.strikes = 0;
    this.spares = 0;
        
    //  Create our collision groups. One for the ball, one for the pins
    this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.pinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
    //this.game.physics.p2.updateBoundsCollisionGroup();
    
    this.bpins = this.game.add.group();
    this.bpins.enableBody = true;
    this.bpins.physicsBodyType = Phaser.Physics.P2JS;
    
    this.pinsPosition = [
                       [32,40],[80,40],[128,40],[176,40],
                          [56,72],[104,72],[152,72],
                              [80,104],[128,104],
                                  [104,136]
                      ];
    
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], 0, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
    
    this.ball = new Ball(this.game, 192, this.game.height - 40, 0);
    this.game.add.existing(this.ball);

    // Set the ships collision group
    this.ball.body.setCollisionGroup(this.ballCollisionGroup);
    this.ball.body.collides(this.pinsCollisionGroup,this.hitPin,this);
    
    this.game.stage.backgroundColor = '#000';
    
    this.portraitWindow = this.game.add.sprite(224, 0, 'windowsmall');
    this.scoreWindow = this.game.add.sprite(224, 96, 'windowbig');
  },
  
  update: function() {
    //this.game.physics.P2.collide(this.ball, this.bpin);
    if(this.ball.onTrack===false){
      if(this.bpins.total<=0){
        //strike or spare
        this.checkStrikeSpare();
        if(this.turn==0){
          //strike
          console.log('strike!');
          this.lasthits.push(10);
          if(this.strikes>0){
            this.lasthits.splice(0,1);
          }else this.lasthits = [];
          this.strikes++;
        }else{
          //spare
          console.log('spare!');
          this.lasthits.push(this.lasthit);
          this.spares++;
        }
        this.turn = 0;
        this.round++;
        this.resetPins();
        this.lasthit = 0;
        this.ball.reset();
      }else if(10 - this.pinsHit == this.bpins.total){
        this.turn++;
        this.checkStrikeSpare();
        this.lasthits.splice(0,1);
        this.lasthits.push(this.lasthit);
        if(this.turn>1){
          this.score+=this.pinsHit;
          this.lastscore = '';
          this.turn = 0;
          this.round++;
          this.resetPins();
          this.score+=this.pinsHit;
        }
        this.lasthit = 0;
        this.ball.reset();
      }
    }
    this.ball.listenChangeDirection();
  },
  
  render: function(){
    this.game.debug.text("Hit Total: " + this.pinsHit + " Actual: " + this.lasthit, 0, 10);
    this.game.debug.text("strikes: " + this.strikes + " spares: " + this.spares, 0, 20);
    this.game.debug.text("Score: " + this.score + " => " + this.lasthits[0] + "|" + this.lasthits[1], 0, 400);
  },
  
  hitPin: function(body1,body2) {
    if(body2.sprite.gotHit === false){
      body2.sprite.gotHit = true;
      this.pinsHit++;
      this.lasthit++;
    }
  },
  
  resetPins: function() {
    this.pinsHit = 0;
    this.bpins.removeAll(true);
    for (var i = 0; i < 10; i++) {
      var bpin = new BowlingPin(this.game, this.pinsPosition[i][0], this.pinsPosition[i][1], 0, this.pinsCollisionGroup);
      bpin.body.collides(this.ballCollisionGroup);
      bpin.body.collides(this.pinsCollisionGroup,this.hitPin,this);
      this.bpins.add(bpin);
    }
  },
  
  checkStrikeSpare: function() {
    if(this.strikes>0){
      if(this.lasthits.length >= 2){
        this.score+=10 + this.lasthits[0] + this.lasthits[1];
        this.strikes--;        
      }
    }
    if(this.spares>0){
      this.score+=10 + this.lasthit;
      this.spares--;
    }
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